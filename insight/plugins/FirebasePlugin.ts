import * as firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/auth'
var randomstring = require('randomstring')
import { Assets } from '@/types/index'
import { AxiosInstance } from 'axios'

// TODO: Transfer every key to .env
var firebaseConfig = {
  apiKey: '',
  authDomain: 'social-express-103904.firebaseapp.com',
  databaseURL: 'https://social-express-103904.firebaseio.com',
  projectId: 'social-express-103904',
  storageBucket: 'social-express-103904.appspot.com',
  messagingSenderId: '1008243500476',
  appId: '1:1008243500476:web:baeeb56c63dfcd707337b9',
  measurementId: 'G-2S9ZEH4HL7'
}
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

// Initiating storage API of firebase
let storage = firebase.storage()
const firestore = storage.ref()

export interface StorageData {
  images?: string[]
  video?: string
  audio?: string
  [index: string]: string[] | string | undefined
}

export interface ProgressAsset {
  url: string
  type: string
  progress: number
  size: number
}

export interface CompleteListener {
  (data: StorageData): void
}

export interface ProgressListener {
  (array: ProgressAsset[]): void
}

export interface Listener {
  complete: CompleteListener
  progress: ProgressListener
  error: Function
}

interface StorageVault {
  listeners: Listener

  init(data: Assets, listeners: Listener): void

  // Assets Uploaded to server
  uploadedAssets: StorageData

  data: StorageData

  dataAsArray: ProgressAsset[]

  // Unpack data to array of ProgressAsset
  unpackAssets(): void

  // Listener called when all the assets are uploaded to server
  uploadCompleteListener(data: StorageData): void

  // Listener called everytime when change is noticed in upload progress
  progressListener(
    index: number,
    type: string,
    progress: number,
    size: number
  ): void

  errorListener(error: Error): void

  // Generate random name to avoid conflict on server
  generateRandomName(blob: Blob): string

  // This function check if images is present in data then
  // length of images in uploadedAssets should be equal to data
  // Confirming all the images are uploaded
  isImagesUploadComplete(): boolean

  // Get Size of Asset in Bytes 10^6 is Mb
  getSizeOfAsset(blob: Blob): number

  // Compress image for saving data using canvas
  compressImage(url: string, type: string): Promise<string>

  isVideoUploadComplete(): boolean
  isAudioUploadComplete(): boolean

  // Check if all the assets are uploaded
  isNetUploadComplete(): boolean

  // Insert Uploaded assets to uploadedAssets
  insertAssetInUploaded(url: string, type: string): void

  // Upload individual assets and fire progress,error or complete callbacks
  uploadPromise(): firebase.storage.UploadTask[]

  // Observer change in progress of upload
  nextOrObserver(
    snapshot: firebase.storage.UploadTaskSnapshot,
    index: number,
    asset: ProgressAsset
  ): void

  firebaseUploadError(error: Error): void

  // Revoke all previous urls
  revokeUrls(): void

  // If isNetUploadComplete is True then call completeListener else pass to next asset
  firebaseUploadComplete(task: firebase.storage.UploadTask, type: string): void

  // Remove all urls containing blob at index 0
  sanitizeUrls(): void

  // Watch and assign callbacks on uploadTask
  manageUploadTask(
    task: firebase.storage.UploadTask,
    index: number,
    asset: ProgressAsset
  ): void

  // Upload all the assets in sequence Images -> Video --> Audio
  bulkUpload(): void

  delete(refString: string): void
}

export class StorageVaultBeta implements StorageVault {
  uploadedAssets = {} as StorageData
  data = {} as StorageData
  dataAsArray = [] as ProgressAsset[]
  listeners = {} as Listener

  constructor() {}

  unpackAssets(): void {
    for (let [key, value] of Object.entries(this.data)) {
      if (key === 'images' && value != undefined) {
        for (let index = 0; index < value.length; index++) {
          this.dataAsArray.push({
            url: value[index] as string,
            type: 'image',
            progress: 0.0,
            size: 0.0
          })
        }
      } else if (value != undefined && typeof value === 'string') {
        this.dataAsArray.push({
          url: value,
          type: key,
          progress: 0.0,
          size: 0.0
        })
      }
    }
  }

  init(data: Assets, listeners: Listener): void {
    this.data = {} as StorageData
    if (data.images != undefined) {
      this.data.images = data.images
    }
    if (data.video != undefined) {
      this.data.video = data.video
    }
    if (data.audio != undefined) {
      this.data.audio = data.audio
    }
    this.listeners = listeners
  }

  uploadCompleteListener(data: StorageData): void {
    if (this.isNetUploadComplete()) {
      this.listeners.complete(data)
    }
  }
  progressListener(
    index: number,
    type: string,
    progress: number,
    size: number
  ): void {
    if (this.dataAsArray[index].type === type) {
      this.dataAsArray[index].progress = progress
      this.dataAsArray[index].size = size
    }
    this.listeners.progress(this.dataAsArray)
  }
  errorListener(error: Error): void {
    throw new Error('Method not implemented.')
  }
  generateRandomName(blob: Blob): string {
    let name = randomstring.generate()
    let extension = blob.type.slice(
      blob.type.indexOf('/') + 1,
      blob.type.length
    )
    return `${name}.${extension}`
  }
  isImagesUploadComplete(): boolean {
    if (
      this.data.images === undefined ||
      (this.uploadedAssets.images != undefined &&
        this.data.images.length === this.uploadedAssets.images.length)
    ) {
      return true
    }
    return false
  }
  getSizeOfAsset(blob: Blob): number {
    // Always return size in Mb i.e 10^6
    return blob.size / 1000000
  }

  compressImage(url: string, type: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      // Implementation of compressor has been put pause
      // if (type != "image") {
      //     resolve(url)
      // } else {
      //     let canvas = document.createElement('canvas') as HTMLCanvasElement
      //     let width = window.innerWidth as number
      //     let height = 50 * window.innerHeight / 100 as number
      //     canvas.width = width
      //     canvas.height = height
      //     let context = canvas.getContext('2d') as CanvasRenderingContext2D
      //     let img = document.createElement('img') as HTMLImageElement
      //     img.src = url
      //     img.onload = function () {
      //         context.scale(width / img.width, height / img.height)
      //         context.drawImage(img, 0, 0)
      //         let link = canvas.toDataURL()
      //         URL.revokeObjectURL(url)
      //         resolve(link)
      //     }
      // }
      resolve(url)
    })
  }
  isVideoUploadComplete(): boolean {
    if (this.data.video === undefined || this.uploadedAssets.video != undefined)
      return true
    return false
  }
  isAudioUploadComplete(): boolean {
    if (this.data.audio === undefined || this.uploadedAssets.audio != undefined)
      return true
    return false
  }
  isNetUploadComplete(): boolean {
    if (
      this.isAudioUploadComplete() &&
      this.isImagesUploadComplete() &&
      this.isVideoUploadComplete()
    )
      return true
    return false
  }
  insertAssetInUploaded(url: string, type: string): void {
    if (type === 'image') {
      if (this.uploadedAssets.images != undefined) {
        this.uploadedAssets.images.push(url)
      } else {
        this.uploadedAssets.images = [url]
      }
    } else {
      this.uploadedAssets[type] = url
    }
  }

  nextOrObserver(
    snapshot: firebase.storage.UploadTaskSnapshot,
    index: number,
    asset: ProgressAsset
  ): void {
    let progress = (snapshot.bytesTransferred * 100) / snapshot.totalBytes
    if (snapshot.state === firebase.storage.TaskState.RUNNING) {
      this.progressListener(index, asset.type, progress, asset.size)
    }
  }
  firebaseUploadError(error: Error): void {
    this.errorListener(error)
  }

  revokeUrls(): void {
    for (let index = 0; index < this.dataAsArray.length; index++) {
      window.URL.revokeObjectURL(this.dataAsArray[index].url)
    }
  }

  sanitizeUrls(): void {
    if (this.uploadedAssets.images != undefined) {
      let images = []
      for (let index in this.uploadedAssets.images) {
        if (this.uploadedAssets.images[index].indexOf('blob') != 0) {
          images.push(this.uploadedAssets.images[index])
        }
      }
      this.uploadedAssets.images = images
    }
    if (
      this.uploadedAssets.video != undefined &&
      this.uploadedAssets.video.indexOf('blob') === 0
    ) {
      this.uploadedAssets.video = undefined
    }

    if (
      this.uploadedAssets.audio != undefined &&
      this.uploadedAssets.audio.indexOf('blob') === 0
    ) {
      this.uploadedAssets.audio = undefined
    }
  }

  firebaseUploadComplete(
    task: firebase.storage.UploadTask,
    type: string
  ): void {
    task.snapshot.ref.getDownloadURL().then(url => {
      this.insertAssetInUploaded(url, type)
      if (this.isNetUploadComplete()) {
        this.revokeUrls()
        this.sanitizeUrls()
        this.uploadCompleteListener(this.uploadedAssets)
      }
    })
  }

  manageUploadTask(
    task: firebase.storage.UploadTask,
    index: number,
    asset: ProgressAsset
  ): void {
    task.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        this.nextOrObserver(snapshot, index, asset)
      },
      error => {
        this.firebaseUploadError(error)
      },
      () => {
        this.firebaseUploadComplete(task, asset.type)
      }
    )
  }

  uploadPromise(): firebase.storage.UploadTask[] {
    const promises = [] as firebase.storage.UploadTask[]
    this.dataAsArray.forEach((value, index) => {
      this.compressImage(value.url, value.type).then(link => {
        fetch(link)
          .then(res => {
            res.blob().then(blob => {
              this.dataAsArray[index].size = this.getSizeOfAsset(blob)
              let uploadTask = firestore
                .child(`assets/${this.generateRandomName(blob)}`)
                .put(blob)
              promises.push(uploadTask)
              this.manageUploadTask(uploadTask, index, value)
            })
          })
          .catch(error => {
            this.errorListener(error)
          })
      })
    })
    return promises
  }
  bulkUpload(): void {
    this.unpackAssets()
    Promise.all(this.uploadPromise()).then(() => {})
  }

  delete(refString: string): void {
    firestore.child(`assets/${refString}`).delete()
  }
}








interface AuthenticationSuccess{
    (result: firebase.auth.UserCredential): void
}

interface AuthenticationError {
    (error: any): void
}

// T is RootState of the store
interface FirebaseAuthenticationInterface{
  // The auth model set by constructor
  fireauth: firebase.auth.Auth

  phoneNumber?: string
  countryCode?: string

  context: AxiosInstance

  // Set Language of process default to browser
  setDeviceLanguage(): void

  // Set ReCaptcha Verifier to prove domain credability to firebase server
  // Invisible or Visible recaptcha can be stated
  setRecaptchaVerifier(
    container: string,
    visiblity?: string,
    success?: Function
  ): void

  // Apply recaptcha widget
  applyRecaptchaVerifier(): void

  setDetails(countryCode: string, phoneNumber: string): void

  // Reset Recaptcha after failure or fallback
  resetRecaptchaVerifier(): void

  // Send Phone number to server for sign-in code
  signInWithPhoneNumber(): void

  // Send the phone-number to server for checking the existance of account
  // If returned value if 0 then account exist other-wise route to Register
  checkAccountExistance(accountId: string): Promise<[boolean, string]>


  signInWithVerificationCode(code: string, callbacks?: {success: AuthenticationSuccess, error: AuthenticationError}): void


}

declare global {
  interface Window {
    recaptchaVerifier: firebase.auth.RecaptchaVerifier,
    confirmationResult: firebase.auth.ConfirmationResult
  }
}

export class FirebaseAuthentication implements FirebaseAuthenticationInterface {
  public fireauth: firebase.auth.Auth
  public context: AxiosInstance
  public phoneNumber?: string
  public countryCode?: string

  constructor(context:AxiosInstance) {
    this.fireauth = firebase.auth()
    this.context = context
  }


  setDeviceLanguage(): void {
    this.fireauth.useDeviceLanguage()
  }

  setDetails(countryCode: string, phoneNumber: string): void{
    this.countryCode = countryCode
    this.phoneNumber = phoneNumber
  }
  setRecaptchaVerifier(
    container: string,
    visiblity?:string,
    success?: Function
  ): void {
    let self = this
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(container, {
      size: visiblity === undefined ? 'invisible' : visiblity,
      callback: function(response: any) {
        self.signInWithPhoneNumber()
        if(success != undefined) success()
      },
      'expired-callback': function() {}
    })
  }
  applyRecaptchaVerifier(): void {
    window.recaptchaVerifier.verify()
  }
  resetRecaptchaVerifier(): void {
    // throw new Error('Method not implemented.')
  }
  signInWithPhoneNumber(): void {
    if(this.countryCode != undefined && this.phoneNumber != undefined){
      let number = `${this.countryCode[0] != '+'? '+': ''}${this.countryCode}${this.phoneNumber}`
      this.fireauth.signInWithPhoneNumber(number, window.recaptchaVerifier).then((result) => {
          window.confirmationResult = result
      }).catch((err) => {

      })
    }
  }
  checkAccountExistance(): Promise<[boolean, string]> {
    return new Promise<[boolean, string]>((resolve, reject) => {
      this.context.get(`auth/account_check?aid=${this.phoneNumber}&rsp`).then(res => {
        resolve([res.data.available === 0, res.data.token])
      }).then(error => {
        reject(error)
      })
    })
  }
  
  signInWithVerificationCode(code: string, callback?: {success: AuthenticationSuccess, error: AuthenticationError}): void {
    window.confirmationResult.confirm(code).then(result => {
        if(callback != undefined){
            callback.success(result)
        }
    }).catch((error) => {
        if(callback != undefined){
            window.recaptchaVerifier.clear()
            callback.error(error)
        }
    })
  }
}
