"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var observable_1 = require("data/observable");
var file_system_1 = require("file-system");
var platform = require("platform");
var app = require("application");
var page_1 = require("ui/page");
var nativescript_audio_1 = require("nativescript-audio");
var email_1 = require("../../providers/email");
var toast_1 = require("../../providers/toast");
var contacts_1 = require("../../providers/contacts");
var settings_1 = require("../../providers/settings");
var nativescript_angular_1 = require("nativescript-angular");
var ng2_simple_timer_1 = require("ng2-simple-timer");
var AudioComponent = (function (_super) {
    __extends(AudioComponent, _super);
    function AudioComponent(page, routerExtensions, emailComposer, toastUtils, contactsUtils, settings, simpleTimer) {
        var _this = _super.call(this) || this;
        _this.routerExtensions = routerExtensions;
        _this.emailComposer = emailComposer;
        _this.toastUtils = toastUtils;
        _this.contactsUtils = contactsUtils;
        _this.settings = settings;
        _this.simpleTimer = simpleTimer;
        _this.player = new nativescript_audio_1.TNSPlayer();
        _this.recorder = new nativescript_audio_1.TNSRecorder();
        _this.set('currentVolume', 1);
        _this.progressValue = 0;
        _this.progressMaxValue = 120000;
        _this.progressMinutes = -1;
        _this.progressMinutesTxt = '00';
        _this.progressSeconds = 0;
        _this.progressSecondsTxt = '00';
        _this.audioSizeTxt = '0';
        _this.simpleTimer.newTimer('seconds', 1);
        _this.simpleTimer.newTimer('minutes', 60);
        return _this;
    }
    AudioComponent.prototype.ngOnInit = function () {
    };
    AudioComponent.prototype.initMeter = function () {
        var _this = this;
        this.resetMeter();
        this.subscribeTimers();
        this.meterInterval = setInterval(function () {
            _this.progressValue += 500;
            _this.audioSizeTxt = _this.calculateRecordSize();
            if (_this.progressValue == _this.progressMaxValue) {
                _this.stopRecord('');
            }
        }, 500);
    };
    AudioComponent.prototype.resetMeter = function () {
        if (this.meterInterval) {
            clearInterval(this.meterInterval);
            this.meterInterval = undefined;
            this.deleteTimers();
        }
    };
    AudioComponent.prototype.subscribeMinutes = function () {
        var _this = this;
        if (this.minutesTimer) {
            this.simpleTimer.unsubscribe(this.minutesTimer);
            this.minutesTimer = undefined;
        }
        else {
            this.minutesTimer = this.simpleTimer.subscribe('minutes', function (e) { return _this.minutesCallback(); });
        }
    };
    AudioComponent.prototype.subscribeTimers = function () {
        this.progressMinutes = -1;
        this.progressMinutesTxt = '00';
        this.progressSeconds = 0;
        this.progressSecondsTxt = '00';
        this.subscribeSeconds();
        this.subscribeMinutes();
    };
    AudioComponent.prototype.minutesCallback = function () {
        this.progressMinutes++;
        this.progressMinutesTxt = '0' + this.progressMinutes;
    };
    AudioComponent.prototype.subscribeSeconds = function () {
        var _this = this;
        if (this.secondsTimer) {
            this.simpleTimer.unsubscribe(this.secondsTimer);
            this.secondsTimer = undefined;
        }
        else {
            this.secondsTimer = this.simpleTimer.subscribe('seconds', function (e) { return _this.secondsCallback(); });
        }
    };
    AudioComponent.prototype.secondsCallback = function () {
        if (this.progressSeconds == 60) {
            this.progressSeconds = 0;
        }
        this.progressSeconds++;
        var str = '';
        if (this.progressSeconds < 10)
            str = '0';
        this.progressSecondsTxt = str + this.progressSeconds;
    };
    AudioComponent.prototype.deleteTimers = function () {
        this.simpleTimer.delTimer('minutes');
        this.simpleTimer.delTimer('seconds');
    };
    AudioComponent.prototype.calculateRecordSize = function () {
        var refDuration = 100;
        var refSize = 78.6;
        var result = Math.round(refSize * (this.progressMinutes * 60 + this.progressSeconds) / refDuration);
        return result.toString();
    };
    AudioComponent.prototype.calculateAudioSize = function (fileName) {
        var _this = this;
        var audioFolder = file_system_1.knownFolders.currentApp().getFolder("audio");
        var audioFile = audioFolder.getFile(fileName + "." + this.platformExtension());
        var src = audioFile.readSync(function (e) {
            _this.toastUtils.showMessage("Error reading file: " + e, 'top');
        });
        var result = Math.round(src.length / 1024);
        return result.toString();
    };
    AudioComponent.prototype.calculateAudioDuration = function (fileSize) {
        var refDuration = 100;
        var refSize = 78.6;
        var result = fileSize * refDuration / refSize;
        return result.toFixed(1);
    };
    AudioComponent.prototype.startRecord = function (args) {
        var _this = this;
        if (nativescript_audio_1.TNSRecorder.CAN_RECORD()) {
            var audioFolder = file_system_1.knownFolders.currentApp().getFolder("audio");
            var audioFormat_1 = 3;
            var audioEncoder_1 = 1;
            var audioChannels_1 = 1;
            var audioSampleRate_1 = 8000;
            var audioBitRate_1 = 8;
            var audioMaxDuration_1 = 120000;
            if (platform.isAndroid) {
                this.settings.getValue('audioFormat').then(function (value) {
                    audioFormat_1 = value;
                });
                this.settings.getValue('audioEncoder').then(function (value) {
                    audioEncoder_1 = value;
                });
                this.settings.getValue('audioChannels').then(function (value) {
                    audioChannels_1 = value;
                });
                this.settings.getValue('audioSampleRate').then(function (value) {
                    audioSampleRate_1 = value;
                });
                this.settings.getValue('audioBitRate').then(function (value) {
                    audioBitRate_1 = value;
                });
                this.settings.getValue('audioMaxDuration').then(function (value) {
                    audioMaxDuration_1 = value;
                });
            }
            var fileName = Date.now().toString();
            this.set('currentFileName', fileName);
            var recordingPath = audioFolder.path + "/" + fileName + "." + this.platformExtension();
            this.recorderOptions = {
                filename: recordingPath,
                format: audioFormat_1,
                encoder: audioEncoder_1,
                channels: audioChannels_1,
                sampleRate: audioSampleRate_1,
                bitRate: audioBitRate_1,
                metering: true,
                maxDuration: audioMaxDuration_1,
                infoCallback: function (infoObject) {
                    console.log(JSON.stringify(infoObject));
                },
                errorCallback: function (errorObject) {
                    console.log(JSON.stringify(errorObject));
                }
            };
            this.recorder.start(this.recorderOptions).then(function (result) {
                _this.toastUtils.showMessage("Start recording", 'top');
                _this.set("isRecording", true);
                if (_this.recorderOptions.metering) {
                    _this.initMeter();
                }
            }, function (err) {
                _this.set("isRecording", false);
                _this.resetMeter();
                _this.toastUtils.showMessage(err, 'top');
            });
        }
        else {
            this.toastUtils.showMessage("This device cannot record audio.", 'top');
        }
    };
    AudioComponent.prototype.stopRecord = function (args) {
        var _this = this;
        this.resetMeter();
        this.recorder.stop().then(function () {
            var fileName = _this.get('currentFileName');
            try {
                _this.audioSizeTxt = _this.calculateAudioSize(fileName);
                _this.audioDurationTxt = _this.calculateAudioDuration(parseFloat(_this.audioSizeTxt));
            }
            catch (e) {
                _this.audioSizeTxt = '0';
                _this.audioDurationTxt = '0';
            }
            _this.progressValue = 0;
            _this.toastUtils.showMessage("Stop recording", 'top');
            _this.set("isRecording", false);
            _this.resetMeter();
        }, function (ex) {
            console.log(ex);
            _this.set("isRecording", false);
            _this.resetMeter();
        });
    };
    /**
     * send audio file by email
     */
    AudioComponent.prototype.sendByEmail = function () {
        var fileName = this.get('currentFileName');
        this.getFile('');
        var contact = this.contactsUtils.currentContact;
        var to = contact ? '' + contact.email : 'dmerino24@gmail.com';
        var cc = 'dmerino24@gmail.com';
        this.emailComposer.setTo(to);
        this.emailComposer.setCc(cc);
        this.emailComposer.setBody('');
        this.emailComposer.setSubject('audio');
        this.emailComposer.addAttachments(fileName + '.' + this.platformExtension(), this.get('recordedAudioFile'));
        this.emailComposer.sendEmail();
    };
    AudioComponent.prototype.getFile = function (args) {
        try {
            var fileName = this.get('currentFileName');
            var audioFolder = file_system_1.knownFolders.currentApp().getFolder("audio");
            var recordedFile = audioFolder.getFile(fileName + "." + this.platformExtension());
            console.log(JSON.stringify(recordedFile));
            console.log('recording exists: ' + file_system_1.File.exists(recordedFile.path));
            this.set("recordedAudioFile", recordedFile.path);
        }
        catch (ex) {
            console.log(ex);
        }
    };
    AudioComponent.prototype.playRecordedFile = function (args) {
        var _this = this;
        var fileName = this.get('currentFileName');
        var audioFolder = file_system_1.knownFolders.currentApp().getFolder("audio");
        var recordedFile = audioFolder.getFile(fileName + "." + this.platformExtension());
        console.log("RECORDED FILE : " + JSON.stringify(recordedFile));
        var playerOptions = {
            audioFile: "~/audio/" + fileName + "." + this.platformExtension(),
            loop: false,
            completeCallback: function () {
                _this.set("isPlaying", false);
                if (!playerOptions.loop) {
                    _this.player.dispose().then(function () {
                        console.log('DISPOSED');
                    }, function (err) {
                        console.log(err);
                    });
                }
            },
            errorCallback: function (errorObject) {
                console.log(JSON.stringify(errorObject));
                _this.toastUtils.showMessage('Error callback', 'top');
                _this.set("isPlaying", false);
            },
            infoCallback: function (infoObject) {
                console.log(JSON.stringify(infoObject));
                //this.toastUtils.showMessage('Playing audio', 'top');
            }
        };
        this.player.playFromFile(playerOptions).then(function () {
            _this.set("isPlaying", true);
            _this.toastUtils.showMessage("Playing recorded file", 'top');
        }, function (err) {
            console.log(err);
            _this.set("isPlaying", false);
        });
    };
    /***** AUDIO PLAYER *****/
    AudioComponent.prototype.playAudio = function (filepath, fileType) {
        var _this = this;
        try {
            var playerOptions = {
                audioFile: filepath,
                completeCallback: function () {
                    _this.player.dispose().then(function () {
                        _this.set("isPlaying", false);
                        console.log('DISPOSED');
                    }, function (err) {
                        console.log('ERROR disposePlayer: ' + err);
                    });
                },
                errorCallback: function (errorObject) {
                    console.log(JSON.stringify(errorObject));
                    _this.set("isPlaying", false);
                },
                infoCallback: function (args) {
                    console.log(JSON.stringify(args));
                    _this.toastUtils.showMessage('Info callback: ' + args.info, 'top');
                    console.log(JSON.stringify(args));
                }
            };
            this.set("isPlaying", true);
            if (fileType === 'localFile') {
                this.player.playFromFile(playerOptions).then(function () {
                    _this.set("isPlaying", true);
                }, function (err) {
                    console.log(err);
                    _this.set("isPlaying", false);
                });
            }
            else if (fileType === 'remoteFile') {
                this.player.playFromUrl(playerOptions).then(function () {
                    _this.set("isPlaying", true);
                }, function (err) {
                    console.log(err);
                    _this.set("isPlaying", false);
                });
            }
        }
        catch (ex) {
            console.log(ex);
        }
    };
    /**
     * PLAY REMOTE AUDIO FILE
     */
    AudioComponent.prototype.playRemoteFile = function (args) {
        console.log('playRemoteFile');
        var filePath = 'http://www.noiseaddicts.com/samples_1w72b820/2514.mp3';
        this.playAudio(filePath, 'remoteFile');
    };
    AudioComponent.prototype.resumePlayer = function () {
        console.log(JSON.stringify(this.player));
        this.player.resume();
    };
    /**
     * PLAY LOCAL AUDIO FILE from app folder
     */
    AudioComponent.prototype.playLocalFile = function (args) {
        var filePath = '~/audio/angel.mp3';
        this.playAudio(filePath, 'localFile');
    };
    /**
     * PAUSE PLAYING
     */
    AudioComponent.prototype.pauseAudio = function (args) {
        var _this = this;
        this.player.pause().then(function () {
            _this.set("isPlaying", false);
        }, function (err) {
            console.log(err);
            _this.set("isPlaying", true);
        });
    };
    AudioComponent.prototype.stopPlaying = function (args) {
        var _this = this;
        this.player.dispose().then(function () {
            _this.toastUtils.showMessage("Stop audio playing", 'top');
        }, function (err) {
            console.log(err);
        });
    };
    /**
     * RESUME PLAYING
     */
    AudioComponent.prototype.resumePlaying = function (args) {
        console.log('START');
        this.player.start();
    };
    AudioComponent.prototype.platformExtension = function () {
        return "" + (app.android ? '3gp' : 'caf');
    };
    AudioComponent.prototype.goBack = function () {
        this.routerExtensions.back();
    };
    return AudioComponent;
}(observable_1.Observable));
AudioComponent = __decorate([
    core_1.Component({
        selector: "audio",
        templateUrl: "pages/audio/audio.html",
        styleUrls: ["pages/audio/audio.css"]
    }),
    __metadata("design:paramtypes", [page_1.Page, nativescript_angular_1.RouterExtensions,
        email_1.EmailComposer, toast_1.ToastUtils,
        contacts_1.ContactsUtils, settings_1.Settings,
        ng2_simple_timer_1.SimpleTimer])
], AudioComponent);
exports.AudioComponent = AudioComponent;
