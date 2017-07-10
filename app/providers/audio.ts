import { Injectable } from '@angular/core';
import { AudioPlayerOptions, AudioRecorderOptions, TNSPlayer, TNSRecorder} from "nativescript-audio";
import { knownFolders, File } from 'file-system';
import * as platform from 'platform';
import * as app from 'application';
import { Settings } from "./settings";
import { ToastUtils } from "../providers/toast";

/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
@Injectable()
export class AudioUtils {

  private recorder: TNSRecorder;
  private player: TNSPlayer;

  public static RECORDER_STATUS_RECORDING: string = 'recording';
  public static RECORDER_STATUS_STOPED: string = 'stoped';
  public static RECORDER_STATUS_ERROR: string = 'error';

  public static PLAYER_STATUS_PLAYING: string = 'playing';
  public static PLAYER_STATUS_PAUSED: string = 'paused';
  public static PLAYER_STATUS_STOPED: string = 'stoped';
  public static PLAYER_STATUS_ERROR: string = 'error';

  public isPlaying: boolean;
  public isRecording: boolean;
  public recordedAudioFile;
  private recorderOptions: AudioRecorderOptions;
  private playerOptions: AudioPlayerOptions;

  private recorderStatus: string = AudioUtils.RECORDER_STATUS_STOPED;
  private playerStatus: string = AudioUtils.PLAYER_STATUS_STOPED;

  constructor(private settings: Settings,  private toastUtils: ToastUtils) {
    this.player = new TNSPlayer();
    this.recorder = new TNSRecorder();
  }

  /**
   * start record audio
   * @param args
   * @returns {boolean}
   */
  public startRecord() {

    if (TNSRecorder.CAN_RECORD()) {

      var audioFolder = knownFolders.currentApp().getFolder("audio");

      let androidFormat = 3;
      let androidEncoder = 1;
      let androidChannels = 1;
      let androidSampleRate = 8000;
      let androidBitRate = 8;

      if (platform.isAndroid) {
        // amr
        // androidFormat = android.media.MediaRecorder.OutputFormat.AMR_WB;
        this.settings.getValue('androidFormat').then(value => {
          androidFormat = value;
        });
        // androidEncoder = android.media.MediaRecorder.AudioEncoder.AMR_WB;
        this.settings.getValue('androidEncoder').then(value => {
          androidEncoder = value;
        });

        this.settings.getValue('androidChannels').then(value => {
          androidChannels = value;
        });

        this.settings.getValue('androidSampleRate').then(value => {
          androidSampleRate = value;
        });

        this.settings.getValue('androidBitRate').then(value => {
          androidBitRate = value;
        });
      }

      let fileName = Date.now().toString();
      let recordingPath = `${audioFolder.path}/${fileName}.${this.platformExtension()}`;
      this.settings.setValue('currentFileName', fileName).then(() => {
        this.recorderOptions = {

          filename: recordingPath,

          format: androidFormat,

          encoder: androidEncoder,

          channels: androidChannels,

          sampleRate: androidSampleRate,

          bitRate: androidBitRate,

          metering: true
        };

        this.recorder.start(this.recorderOptions).then(result => {
          this.recorderSuccessCallback(result, AudioUtils.RECORDER_STATUS_RECORDING);
        }, error => {
          this.recorderErrorCallback(error, AudioUtils.RECORDER_STATUS_STOPED);
        }).catch(error => {
          this.recorderErrorCallback(error, AudioUtils.RECORDER_STATUS_STOPED);
        });
      });
    } else {

    }
  }

  /**
   * stop record audio
   * @param args
   */
  public stopRecord() {
    this.recorder.stop().then(() => {
      this.recorderSuccessCallback('', AudioUtils.RECORDER_STATUS_STOPED);
    }, error => {
      this.recorderErrorCallback(error, AudioUtils.RECORDER_STATUS_STOPED);
    }).catch(error => {
      this.recorderErrorCallback(error, AudioUtils.RECORDER_STATUS_STOPED);
    });
  }

  /**
   * get audio file recorded
   * @returns {any}
   */
  getRecordedAudioFile(): File{
    this.getFile();
    return this.recordedAudioFile;
  }

  getFileSuccessCallback(result){
    this.recordedAudioFile = result;
  }

  getFileErrorCallback(error){
    this.recordedAudioFile = null;
  }
  /**
   * set value to file recorded
   * @param args
   */
  getFile() {
    try {
      this.getRecordedFileName().then(result => {
        this.getFileSuccessCallback(result);
      }, error => {
        this.getFileErrorCallback(error);
      }).catch(error => {
        this.getFileErrorCallback(error);
      });
    } catch (ex) {
      this.recordedAudioFile = null;
    }
  }

  /**
   * get recorded file name
   * @returns {Promise<any>}
   */
  getRecordedFileName(){
    return this.settings.getValue('currentFileName');
  }

  /**
   * play recorded audio file
   * @param args
   */
  public playRecordedFile() {

    this.getRecordedFileName().then(value => {
      let file = value;
      let audioFolder = knownFolders.currentApp().getFolder("audio");
      let recordedFile = audioFolder.getFile(`${file}.${this.platformExtension()}`);
      console.log("RECORDED FILE : " + JSON.stringify(recordedFile));

      this.getRecordedFileName().then(fileName => {
        this.playerOptions = {
          audioFile: `~/audio/${fileName}.${this.platformExtension()}`,
          loop: false,

          completeCallback: () => {
            if (!this.playerOptions.loop) {
              this.player.dispose().then(result => {
                this.playerSuccessCallback(result, AudioUtils.PLAYER_STATUS_STOPED);
              }, (error) => {
                this.playerErrorCallback(error, AudioUtils.PLAYER_STATUS_STOPED);
              });
            }
          },

          errorCallback: (error) => {

          }
        };

        this.player.playFromFile(this.playerOptions).then(result => {
          this.playerSuccessCallback(result, AudioUtils.PLAYER_STATUS_PLAYING);
        }, error => {
          this.playerErrorCallback(error, AudioUtils.PLAYER_STATUS_STOPED);
        }).catch(error => {
          this.playerErrorCallback(error, AudioUtils.PLAYER_STATUS_STOPED);
        });
      });
    });
  }

  /***** AUDIO PLAYER *****/

  public playAudio(filePath: string, fileType: string) {
    try {
      this.playerOptions = {
        audioFile: filePath,
        loop: false,
        completeCallback: () => {
          this.player.dispose().then(result => {
            this.playerSuccessCallback(result, AudioUtils.PLAYER_STATUS_STOPED);
          }, (error) => {
            this.playerErrorCallback(error, AudioUtils.PLAYER_STATUS_STOPED);
          });
        },

        errorCallback: (error) => {

        },
      };

      if (fileType === 'localFile') {
        this.player.playFromFile(this.playerOptions).then(result => {
          this.playerSuccessCallback(result, AudioUtils.PLAYER_STATUS_PLAYING);
        }, error => {
          this.playerErrorCallback(error, AudioUtils.PLAYER_STATUS_STOPED);
        }).catch(error => {
          this.playerErrorCallback(error, AudioUtils.PLAYER_STATUS_STOPED);
        });
      } else if (fileType === 'remoteFile') {
        this.player.playFromUrl(this.playerOptions).then(result => {
          this.playerSuccessCallback(result, AudioUtils.PLAYER_STATUS_PLAYING);
        }, error => {
          this.playerErrorCallback(error, AudioUtils.PLAYER_STATUS_STOPED);
        }).catch(error => {
          this.playerErrorCallback(error, AudioUtils.PLAYER_STATUS_STOPED);
        });
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  /**
   * PLAY REMOTE AUDIO FILE
   */
  public playRemoteFile(filePath) {
    this.playAudio(filePath, 'remoteFile');
  }

  /**
   * PLAY LOCAL AUDIO FILE from app folder
   */
  public playLocalFile(filePath) {
    this.playAudio(filePath, 'localFile');
  }

  /**
   * PAUSE PLAYING
   */
  public pauseAudio() {
    this.player.pause().then(result => {
      this.playerSuccessCallback(result, AudioUtils.PLAYER_STATUS_PAUSED);
    }, error => {
      this.playerErrorCallback(error, AudioUtils.PLAYER_STATUS_STOPED);
    }).catch(error => {
      this.playerErrorCallback(error, AudioUtils.PLAYER_STATUS_STOPED);
    });
  }

  /**
   * stop playing
   * @param args
   */
  public stopAudio() {
    this.player.dispose().then(result => {
      this.playerSuccessCallback(result, AudioUtils.PLAYER_STATUS_STOPED);
    }, (error) => {
      this.playerErrorCallback(error, AudioUtils.PLAYER_STATUS_STOPED);
    });
  }

  /**
   * RESUME PLAYING
   */
  public resumeAudio() {
    this.player.resume();
    this.playerSuccessCallback('', AudioUtils.PLAYER_STATUS_PLAYING);
  }

  public platformExtension() {
    return `${app.android ? '3gp' : 'caf'}`;
  }

  public setVolume(value: number){
    this.player.volume = value;
  }

  public getRecorderOptions(): AudioRecorderOptions {
    return this.recorderOptions;
  }

  public getPlayerOptions(): AudioPlayerOptions {
    return this.playerOptions;
  }

  public getRecorderMeters(channel: number) {
    return this.recorder.getMeters(channel);
  }

  public isAudioPlaying() {
    return this.player.isAudioPlaying();
  }

  public getAudioTrackDuration() {
    return this.player.getAudioTrackDuration();
  }

  public recorderSuccessCallback(result: any, status: string){
    this.recorderStatus = status;
    this.toastUtils.showMessage('Recorder status: ' + status, 'top');
  }

  public recorderErrorCallback(error: any, status: string){
    this.recorderStatus = status;
    this.toastUtils.showMessage('Recorder error: ' + error, 'top');
  }

  public playerSuccessCallback(result: any, status: string){
    this.playerStatus = status;
    this.toastUtils.showMessage('Player status: ' + status, 'top');
  }

  public playerErrorCallback(error: any, status: string){
    this.playerStatus = status;
    this.toastUtils.showMessage('Player error: ' + error, 'top');
  }

  public getRecorderStatus(): string {
    return this.recorderStatus;
  }

  public getPlayerStatus(): string {
    return this.playerStatus;
  }
}
