import { Component, OnInit } from "@angular/core";
import { Observable } from 'data/observable';
import { knownFolders, File } from 'file-system';
import * as platform from 'platform';
import * as app from 'application';
import { Page } from 'ui/page';
import { Slider } from 'ui/slider';
import { AudioPlayerOptions, AudioRecorderOptions, TNSPlayer, TNSRecorder } from "nativescript-audio";
import { EmailComposer } from "../../providers/email";
import { ToastUtils } from "../../providers/toast";
import { ContactsUtils } from "../../providers/contacts";
import { Settings } from "../../providers/settings";
import { RouterExtensions } from "nativescript-angular";
import { SimpleTimer } from "ng2-simple-timer";

declare var android;

@Component({
    selector: "audio",
    templateUrl: "pages/audio/audio.html",
    styleUrls: ["pages/audio/audio.css"]
})
export class AudioComponent extends Observable implements OnInit {

    public isPlaying: boolean;
    public isRecording: boolean;
    public recordedAudioFile: string;
    private recorder;
    private player;

    private recorderOptions: AudioRecorderOptions;

    private audioSizeTxt: string;
    private audioDurationTxt: string;

    private meterInterval: any;
    private _slider: Slider;

    private progressValue: number;
    private progressMaxValue: number;
    private minutesTimer: string;
    private progressMinutes: number;
    private progressMinutesTxt: string;
    private secondsTimer: string;
    private progressSeconds: number;
    private progressSecondsTxt: string;

    constructor(page: Page, private routerExtensions: RouterExtensions,
                private emailComposer: EmailComposer, private toastUtils: ToastUtils,
                private contactsUtils: ContactsUtils, private settings: Settings,
                private simpleTimer: SimpleTimer) {
        super();

        this.player = new TNSPlayer();
        this.recorder = new TNSRecorder();
        this.set('currentVolume', 1);
        this.progressValue = 0;
        this.progressMaxValue = 120000;
        this.progressMinutes = -1;
        this.progressMinutesTxt = '00';
        this.progressSeconds = 0;
        this.progressSecondsTxt = '00';

        this.audioSizeTxt = '0';

        this.simpleTimer.newTimer('seconds', 1);
        this.simpleTimer.newTimer('minutes', 60);
    }

    ngOnInit() {

    }

    private initMeter() {
        this.resetMeter();
        this.subscribeTimers();
        this.meterInterval = setInterval(() => {

            this.progressValue += 500;
            this.audioSizeTxt = this.calculateRecordSize();

            if (this.progressValue == this.progressMaxValue) {
                this.stopRecord('');
            }
        }, 500);
    }

    private resetMeter() {
        if (this.meterInterval) {
            clearInterval(this.meterInterval);
            this.meterInterval = undefined;
            this.deleteTimers();
        }
    }

    private subscribeMinutes() {
        if (this.minutesTimer) {
            this.simpleTimer.unsubscribe(this.minutesTimer);
            this.minutesTimer = undefined;
        } else {
            this.minutesTimer = this.simpleTimer.subscribe('minutes', e => this.minutesCallback());
        }
    }

    private subscribeTimers() {
        this.progressMinutes = -1;
        this.progressMinutesTxt = '00';
        this.progressSeconds = 0;
        this.progressSecondsTxt = '00';
        this.subscribeSeconds();
        this.subscribeMinutes();
    }

    minutesCallback() {
        this.progressMinutes++;
        this.progressMinutesTxt = '0' + this.progressMinutes;
    }

    private subscribeSeconds() {
        if (this.secondsTimer) {
            this.simpleTimer.unsubscribe(this.secondsTimer);
            this.secondsTimer = undefined;
        } else {
            this.secondsTimer = this.simpleTimer.subscribe('seconds', e => this.secondsCallback());
        }
    }

    secondsCallback() {

        if (this.progressSeconds == 60) {
            this.progressSeconds = 0;
        }
        this.progressSeconds++;

        let str = '';
        if (this.progressSeconds < 10)
            str = '0';

        this.progressSecondsTxt = str + this.progressSeconds;
    }

    private deleteTimers() {
        this.simpleTimer.delTimer('minutes');
        this.simpleTimer.delTimer('seconds');
    }

    private calculateRecordSize(): string {
        let refDuration: number = 100;
        let refSize: number = 78.6;

        let result = Math.round(refSize * (this.progressMinutes * 60 + this.progressSeconds) / refDuration);
        return result.toString();
    }

    private calculateAudioSize(fileName: string): string {
        let audioFolder = knownFolders.currentApp().getFolder("audio");
        let audioFile: File = audioFolder.getFile(`${fileName}.${this.platformExtension()}`);

        let src = audioFile.readSync(e => {
            this.toastUtils.showMessage("Error reading file: " + e, 'top');
        });

        let result =  Math.round(src.length / 1024);

        return result.toString();
    }

    private calculateAudioDuration(fileSize: number): string {
        let refDuration: number = 100;
        let refSize: number = 78.6;

        let result = fileSize * refDuration / refSize;
        return result.toFixed(1);
    }

    public startRecord(args) {
        if (TNSRecorder.CAN_RECORD()) {

            var audioFolder = knownFolders.currentApp().getFolder("audio");

            let audioFormat = 3;
            let audioEncoder = 1;
            let audioChannels = 1;
            let audioSampleRate = 8000;
            let audioBitRate = 8;
            let audioMaxDuration = 120000;

            if (platform.isAndroid) {
                this.settings.getValue('audioFormat').then(value => {
                    audioFormat = value;
                });

                this.settings.getValue('audioEncoder').then(value => {
                    audioEncoder = value;
                });

                this.settings.getValue('audioChannels').then(value => {
                    audioChannels = value;
                });

                this.settings.getValue('audioSampleRate').then(value => {
                    audioSampleRate = value;
                });

                this.settings.getValue('audioBitRate').then(value => {
                    audioBitRate = value;
                });

                this.settings.getValue('audioMaxDuration').then(value => {
                    audioMaxDuration = value;
                });
            }

            let fileName = Date.now().toString();
            this.set('currentFileName', fileName);

            let recordingPath = `${audioFolder.path}/${fileName}.${this.platformExtension()}`;
            this.recorderOptions = {

                filename: recordingPath,

                format: audioFormat,

                encoder: audioEncoder,

                channels: audioChannels,

                sampleRate: audioSampleRate,

                bitRate: audioBitRate,

                metering: true,

                maxDuration: audioMaxDuration,

                infoCallback: (infoObject) => {
                    console.log(JSON.stringify(infoObject));
                },

                errorCallback: (errorObject) => {
                    console.log(JSON.stringify(errorObject));
                }
            };

            this.recorder.start(this.recorderOptions).then((result) => {
                this.toastUtils.showMessage("Start recording", 'top');

                this.set("isRecording", true);
                if (this.recorderOptions.metering) {
                    this.initMeter();
                }
            }, (err) => {
                this.set("isRecording", false);
                this.resetMeter();
                this.toastUtils.showMessage(err, 'top');
            });
        } else {
            this.toastUtils.showMessage("This device cannot record audio.", 'top');
        }
    }

    public stopRecord(args) {
        this.resetMeter();
        this.recorder.stop().then(() => {

            let fileName = this.get('currentFileName');

            try {

                this.audioSizeTxt = this.calculateAudioSize(fileName);
                this.audioDurationTxt = this.calculateAudioDuration(parseFloat(this.audioSizeTxt));

            } catch (e) {
                this.audioSizeTxt = '0';
                this.audioDurationTxt = '0';
            }

            this.progressValue = 0;
            this.toastUtils.showMessage("Stop recording", 'top');

            this.set("isRecording", false);

            this.resetMeter();
        }, (ex) => {
            console.log(ex);
            this.set("isRecording", false);
            this.resetMeter();
        });
    }

    /**
     * send audio file by email
     */
    public sendByEmail() {
        let fileName = this.get('currentFileName');
        this.getFile('');
        let contact = this.contactsUtils.currentContact;
        let to = contact ? '' + contact.email : 'dmerino24@gmail.com';
        let cc = 'dmerino24@gmail.com';
        this.emailComposer.setTo(to);
        this.emailComposer.setCc(cc);
        this.emailComposer.setBody('');
        this.emailComposer.setSubject('audio');
        this.emailComposer.addAttachments(fileName + '.' + this.platformExtension(), this.get('recordedAudioFile'));
        this.emailComposer.sendEmail();
    }

    public getFile(args) {
        try {
            let fileName = this.get('currentFileName');
            let audioFolder = knownFolders.currentApp().getFolder("audio");
            let recordedFile = audioFolder.getFile(`${fileName}.${this.platformExtension()}`);

            console.log(JSON.stringify(recordedFile));
            console.log('recording exists: ' + File.exists(recordedFile.path));
            this.set("recordedAudioFile", recordedFile.path);
        } catch (ex) {
            console.log(ex);
        }
    }


    public playRecordedFile(args) {
        let fileName = this.get('currentFileName');
        let audioFolder = knownFolders.currentApp().getFolder("audio");
        let recordedFile = audioFolder.getFile(`${fileName}.${this.platformExtension()}`);
        console.log("RECORDED FILE : " + JSON.stringify(recordedFile));

        var playerOptions: AudioPlayerOptions = {
            audioFile: `~/audio/${fileName}.${this.platformExtension()}`,
            loop: false,
            completeCallback: () => {
                this.set("isPlaying", false);
                if (!playerOptions.loop) {
                    this.player.dispose().then(() => {
                        console.log('DISPOSED');
                    }, (err) => {
                        console.log(err);
                    });
                }

            },

            errorCallback: (errorObject) => {
                console.log(JSON.stringify(errorObject));

                this.toastUtils.showMessage('Error callback', 'top');
                this.set("isPlaying", false);
            },

            infoCallback: (infoObject) => {
                console.log(JSON.stringify(infoObject));

                //this.toastUtils.showMessage('Playing audio', 'top');
            }
        };


        this.player.playFromFile(playerOptions).then(() => {
            this.set("isPlaying", true);
            this.toastUtils.showMessage("Playing recorded file", 'top');
        }, (err) => {
            console.log(err);
            this.set("isPlaying", false);
        });

    }

    /***** AUDIO PLAYER *****/

    public playAudio(filepath: string, fileType: string) {

        try {
            var playerOptions = {
                audioFile: filepath,

                completeCallback: () => {

                    this.player.dispose().then(() => {
                        this.set("isPlaying", false);
                        console.log('DISPOSED');
                    }, (err) => {
                        console.log('ERROR disposePlayer: ' + err);
                    });
                },

                errorCallback: (errorObject) => {
                    console.log(JSON.stringify(errorObject));
                    this.set("isPlaying", false);
                },

                infoCallback: (args) => {
                    console.log(JSON.stringify(args));

                    this.toastUtils.showMessage('Info callback: ' + args.info, 'top');
                    console.log(JSON.stringify(args));
                }
            };

            this.set("isPlaying", true);

            if (fileType === 'localFile') {
                this.player.playFromFile(playerOptions).then(() => {
                    this.set("isPlaying", true);
                }, (err) => {
                    console.log(err);
                    this.set("isPlaying", false);
                });
            } else if (fileType === 'remoteFile') {
                this.player.playFromUrl(playerOptions).then(() => {
                    this.set("isPlaying", true);
                }, (err) => {
                    console.log(err);
                    this.set("isPlaying", false);
                });
            }
        } catch (ex) {
            console.log(ex);
        }
    }

    /**
     * PLAY REMOTE AUDIO FILE
     */
    public playRemoteFile(args) {
        console.log('playRemoteFile');
        var filePath = 'http://www.noiseaddicts.com/samples_1w72b820/2514.mp3';
        this.playAudio(filePath, 'remoteFile');
    }

    public resumePlayer() {
        console.log(JSON.stringify(this.player));
        this.player.resume();
    }

    /**
     * PLAY LOCAL AUDIO FILE from app folder
     */
    public playLocalFile(args) {
        let filePath = '~/audio/angel.mp3';
        this.playAudio(filePath, 'localFile');
    }


    /**
     * PAUSE PLAYING
     */
    public pauseAudio(args) {
        this.player.pause().then(() => {
            this.set("isPlaying", false);
        }, (err) => {
            console.log(err);
            this.set("isPlaying", true);
        });
    }

    public stopPlaying(args) {
        this.player.dispose().then(() => {
            this.toastUtils.showMessage("Stop audio playing", 'top');
        }, (err) => {
            console.log(err);
        });
    }

    /**
     * RESUME PLAYING
     */
    public resumePlaying(args) {
        console.log('START');
        this.player.start();
    }

    private platformExtension() {
        return `${app.android ? '3gp' : 'caf'}`;
    }

    public goBack() {
        this.routerExtensions.back();
    }
}
