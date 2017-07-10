"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_audio_1 = require("nativescript-audio");
var file_system_1 = require("file-system");
var platform = require("platform");
var app = require("application");
var settings_1 = require("./settings");
var toast_1 = require("../providers/toast");
/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
var AudioUtils = AudioUtils_1 = (function () {
    function AudioUtils(settings, toastUtils) {
        this.settings = settings;
        this.toastUtils = toastUtils;
        this.recorderStatus = AudioUtils_1.RECORDER_STATUS_STOPED;
        this.playerStatus = AudioUtils_1.PLAYER_STATUS_STOPED;
        this.player = new nativescript_audio_1.TNSPlayer();
        this.recorder = new nativescript_audio_1.TNSRecorder();
    }
    /**
     * start record audio
     * @param args
     * @returns {boolean}
     */
    AudioUtils.prototype.startRecord = function () {
        var _this = this;
        if (nativescript_audio_1.TNSRecorder.CAN_RECORD()) {
            var audioFolder = file_system_1.knownFolders.currentApp().getFolder("audio");
            var androidFormat_1 = 3;
            var androidEncoder_1 = 1;
            var androidChannels_1 = 1;
            var androidSampleRate_1 = 8000;
            var androidBitRate_1 = 8;
            if (platform.isAndroid) {
                // amr
                // androidFormat = android.media.MediaRecorder.OutputFormat.AMR_WB;
                this.settings.getValue('androidFormat').then(function (value) {
                    androidFormat_1 = value;
                });
                // androidEncoder = android.media.MediaRecorder.AudioEncoder.AMR_WB;
                this.settings.getValue('androidEncoder').then(function (value) {
                    androidEncoder_1 = value;
                });
                this.settings.getValue('androidChannels').then(function (value) {
                    androidChannels_1 = value;
                });
                this.settings.getValue('androidSampleRate').then(function (value) {
                    androidSampleRate_1 = value;
                });
                this.settings.getValue('androidBitRate').then(function (value) {
                    androidBitRate_1 = value;
                });
            }
            var fileName = Date.now().toString();
            var recordingPath_1 = audioFolder.path + "/" + fileName + "." + this.platformExtension();
            this.settings.setValue('currentFileName', fileName).then(function () {
                _this.recorderOptions = {
                    filename: recordingPath_1,
                    format: androidFormat_1,
                    encoder: androidEncoder_1,
                    channels: androidChannels_1,
                    sampleRate: androidSampleRate_1,
                    bitRate: androidBitRate_1,
                    metering: true
                };
                _this.recorder.start(_this.recorderOptions).then(function (result) {
                    _this.recorderSuccessCallback(result, AudioUtils_1.RECORDER_STATUS_RECORDING);
                }, function (error) {
                    _this.recorderErrorCallback(error, AudioUtils_1.RECORDER_STATUS_STOPED);
                }).catch(function (error) {
                    _this.recorderErrorCallback(error, AudioUtils_1.RECORDER_STATUS_STOPED);
                });
            });
        }
        else {
        }
    };
    /**
     * stop record audio
     * @param args
     */
    AudioUtils.prototype.stopRecord = function () {
        var _this = this;
        this.recorder.stop().then(function () {
            _this.recorderSuccessCallback('', AudioUtils_1.RECORDER_STATUS_STOPED);
        }, function (error) {
            _this.recorderErrorCallback(error, AudioUtils_1.RECORDER_STATUS_STOPED);
        }).catch(function (error) {
            _this.recorderErrorCallback(error, AudioUtils_1.RECORDER_STATUS_STOPED);
        });
    };
    /**
     * get audio file recorded
     * @returns {any}
     */
    AudioUtils.prototype.getRecordedAudioFile = function () {
        this.getFile();
        return this.recordedAudioFile;
    };
    AudioUtils.prototype.getFileSuccessCallback = function (result) {
        this.recordedAudioFile = result;
    };
    AudioUtils.prototype.getFileErrorCallback = function (error) {
        this.recordedAudioFile = null;
    };
    /**
     * set value to file recorded
     * @param args
     */
    AudioUtils.prototype.getFile = function () {
        var _this = this;
        try {
            this.getRecordedFileName().then(function (result) {
                _this.getFileSuccessCallback(result);
            }, function (error) {
                _this.getFileErrorCallback(error);
            }).catch(function (error) {
                _this.getFileErrorCallback(error);
            });
        }
        catch (ex) {
            this.recordedAudioFile = null;
        }
    };
    /**
     * get recorded file name
     * @returns {Promise<any>}
     */
    AudioUtils.prototype.getRecordedFileName = function () {
        return this.settings.getValue('currentFileName');
    };
    /**
     * play recorded audio file
     * @param args
     */
    AudioUtils.prototype.playRecordedFile = function () {
        var _this = this;
        this.getRecordedFileName().then(function (value) {
            var file = value;
            var audioFolder = file_system_1.knownFolders.currentApp().getFolder("audio");
            var recordedFile = audioFolder.getFile(file + "." + _this.platformExtension());
            console.log("RECORDED FILE : " + JSON.stringify(recordedFile));
            _this.getRecordedFileName().then(function (fileName) {
                _this.playerOptions = {
                    audioFile: "~/audio/" + fileName + "." + _this.platformExtension(),
                    loop: false,
                    completeCallback: function () {
                        if (!_this.playerOptions.loop) {
                            _this.player.dispose().then(function (result) {
                                _this.playerSuccessCallback(result, AudioUtils_1.PLAYER_STATUS_STOPED);
                            }, function (error) {
                                _this.playerErrorCallback(error, AudioUtils_1.PLAYER_STATUS_STOPED);
                            });
                        }
                    },
                    errorCallback: function (error) {
                    }
                };
                _this.player.playFromFile(_this.playerOptions).then(function (result) {
                    _this.playerSuccessCallback(result, AudioUtils_1.PLAYER_STATUS_PLAYING);
                }, function (error) {
                    _this.playerErrorCallback(error, AudioUtils_1.PLAYER_STATUS_STOPED);
                }).catch(function (error) {
                    _this.playerErrorCallback(error, AudioUtils_1.PLAYER_STATUS_STOPED);
                });
            });
        });
    };
    /***** AUDIO PLAYER *****/
    AudioUtils.prototype.playAudio = function (filePath, fileType) {
        var _this = this;
        try {
            this.playerOptions = {
                audioFile: filePath,
                loop: false,
                completeCallback: function () {
                    _this.player.dispose().then(function (result) {
                        _this.playerSuccessCallback(result, AudioUtils_1.PLAYER_STATUS_STOPED);
                    }, function (error) {
                        _this.playerErrorCallback(error, AudioUtils_1.PLAYER_STATUS_STOPED);
                    });
                },
                errorCallback: function (error) {
                },
            };
            if (fileType === 'localFile') {
                this.player.playFromFile(this.playerOptions).then(function (result) {
                    _this.playerSuccessCallback(result, AudioUtils_1.PLAYER_STATUS_PLAYING);
                }, function (error) {
                    _this.playerErrorCallback(error, AudioUtils_1.PLAYER_STATUS_STOPED);
                }).catch(function (error) {
                    _this.playerErrorCallback(error, AudioUtils_1.PLAYER_STATUS_STOPED);
                });
            }
            else if (fileType === 'remoteFile') {
                this.player.playFromUrl(this.playerOptions).then(function (result) {
                    _this.playerSuccessCallback(result, AudioUtils_1.PLAYER_STATUS_PLAYING);
                }, function (error) {
                    _this.playerErrorCallback(error, AudioUtils_1.PLAYER_STATUS_STOPED);
                }).catch(function (error) {
                    _this.playerErrorCallback(error, AudioUtils_1.PLAYER_STATUS_STOPED);
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
    AudioUtils.prototype.playRemoteFile = function (filePath) {
        this.playAudio(filePath, 'remoteFile');
    };
    /**
     * PLAY LOCAL AUDIO FILE from app folder
     */
    AudioUtils.prototype.playLocalFile = function (filePath) {
        this.playAudio(filePath, 'localFile');
    };
    /**
     * PAUSE PLAYING
     */
    AudioUtils.prototype.pauseAudio = function () {
        var _this = this;
        this.player.pause().then(function (result) {
            _this.playerSuccessCallback(result, AudioUtils_1.PLAYER_STATUS_PAUSED);
        }, function (error) {
            _this.playerErrorCallback(error, AudioUtils_1.PLAYER_STATUS_STOPED);
        }).catch(function (error) {
            _this.playerErrorCallback(error, AudioUtils_1.PLAYER_STATUS_STOPED);
        });
    };
    /**
     * stop playing
     * @param args
     */
    AudioUtils.prototype.stopAudio = function () {
        var _this = this;
        this.player.dispose().then(function (result) {
            _this.playerSuccessCallback(result, AudioUtils_1.PLAYER_STATUS_STOPED);
        }, function (error) {
            _this.playerErrorCallback(error, AudioUtils_1.PLAYER_STATUS_STOPED);
        });
    };
    /**
     * RESUME PLAYING
     */
    AudioUtils.prototype.resumeAudio = function () {
        this.player.resume();
        this.playerSuccessCallback('', AudioUtils_1.PLAYER_STATUS_PLAYING);
    };
    AudioUtils.prototype.platformExtension = function () {
        return "" + (app.android ? '3gp' : 'caf');
    };
    AudioUtils.prototype.setVolume = function (value) {
        this.player.volume = value;
    };
    AudioUtils.prototype.getRecorderOptions = function () {
        return this.recorderOptions;
    };
    AudioUtils.prototype.getPlayerOptions = function () {
        return this.playerOptions;
    };
    AudioUtils.prototype.getRecorderMeters = function (channel) {
        return this.recorder.getMeters(channel);
    };
    AudioUtils.prototype.isAudioPlaying = function () {
        return this.player.isAudioPlaying();
    };
    AudioUtils.prototype.getAudioTrackDuration = function () {
        return this.player.getAudioTrackDuration();
    };
    AudioUtils.prototype.recorderSuccessCallback = function (result, status) {
        this.recorderStatus = status;
        this.toastUtils.showMessage('Recorder status: ' + status, 'top');
    };
    AudioUtils.prototype.recorderErrorCallback = function (error, status) {
        this.recorderStatus = status;
        this.toastUtils.showMessage('Recorder error: ' + error, 'top');
    };
    AudioUtils.prototype.playerSuccessCallback = function (result, status) {
        this.playerStatus = status;
        this.toastUtils.showMessage('Player status: ' + status, 'top');
    };
    AudioUtils.prototype.playerErrorCallback = function (error, status) {
        this.playerStatus = status;
        this.toastUtils.showMessage('Player error: ' + error, 'top');
    };
    AudioUtils.prototype.getRecorderStatus = function () {
        return this.recorderStatus;
    };
    AudioUtils.prototype.getPlayerStatus = function () {
        return this.playerStatus;
    };
    return AudioUtils;
}());
AudioUtils.RECORDER_STATUS_RECORDING = 'recording';
AudioUtils.RECORDER_STATUS_STOPED = 'stoped';
AudioUtils.RECORDER_STATUS_ERROR = 'error';
AudioUtils.PLAYER_STATUS_PLAYING = 'playing';
AudioUtils.PLAYER_STATUS_PAUSED = 'paused';
AudioUtils.PLAYER_STATUS_STOPED = 'stoped';
AudioUtils.PLAYER_STATUS_ERROR = 'error';
AudioUtils = AudioUtils_1 = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [settings_1.Settings, toast_1.ToastUtils])
], AudioUtils);
exports.AudioUtils = AudioUtils;
var AudioUtils_1;
