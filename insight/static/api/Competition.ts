import { CompetitonInterface, Hobby, PostData, User } from '@/types/index'


export interface CompetitionJsonRequest {
  tag: string
  name: string
  judged_by_user: number
  start: string
  end: string
  result: string
  images: string[]
  hobbies: string[]
  details: object
}

interface AboutData {
  details: {
    [heading: string]: string;
  };
  host: {
    avatar?: string;
    username?: string;
    name?: string
  };
  hobbies: Hobby[]

}


export interface CompetitionLeaderboard {
  avatar: string;
  name: string;
  username: string;
  score: number;
  rank: number;
  trend: number;
  isSelf: number
}


export interface ViewJson{
  tabs: {
    [TabKey: string]: string;
  };
  start: string;
  end: string;
  result: string;
  name: string;
  tag: string;
  images: string[];
  is_ended: number;
  is_finished: number;
  is_host: number;
  current_tab: string;
  body: AboutData | PostData[] | CompetitionLeaderboard[]
}

abstract class AbstractCompetition implements CompetitonInterface {
  // Indexing
  [k: string]:
    | string
    | number
    | boolean
    | Date
    | string[]
    | object
    | User[]
    | PostData[]
    | undefined

  key?: string
  tag: string
  name: string
  is_host: boolean
  post_count?: number | undefined
  participated?: boolean | undefined
  is_active?: boolean | undefined
  start?: Date | undefined
  end?: Date | undefined
  result?: Date | undefined
  images: string[]
  hobbies?: Hobby[]
  details?: object | undefined
  user_host?: string | undefined
  judged_by_user?: boolean | undefined
  is_public_competition?: boolean | undefined

  // Auxilary Properties
  banned_users?: string[] | User[] | undefined
  banned_posts?: string[] | PostData[] | undefined

  // Tabular Properties
  leaderboard?: CompetitionLeaderboard[]
  feed?: PostData[]

  max_image?: number

  // Static method to check tag is unique
  // static isTagUnique(tag: string): Promise<boolean>;

  // manipulate image
  // if image is provided but index is `undefined` then add image to images
  // elif index is provided but image is `undefined` them remove image at that index
  // elif index and image both are provided than replace the image at the index and dump that image
  // if max_image is defined than allow maximum image upto that length, otherwise start replaceing from back
  abstract imageManipulate(data: { image?: string; index?: number }): void

  // Static method
  // abstract _imageManipulate(array: string[], max_image: number,data: {image?: string, index?: number}): string[];
  abstract rename(name: string): void

  /**
   *  Static Method
   * @param array: string[]
   * @param hobbies?: string[]
   * @param rm_hobbies?: string[]
   * insert hobbies into @array and remove rm_hobbies from @array
   */
  // abstract _setHobbies(array: string[], hobbies?: string[], rm_hobbies?: string[]): string[];

  abstract setHobbies(hobbies?: Hobby[], rm_hobbies?: Hobby[]): void

  abstract setStartDate(time: Date): void

  abstract setEndDate(time: Date): void

  abstract setResultDate(time: Date): void

  abstract appendLeaderboard(data: CompetitionLeaderboard[]): void

  abstract appendFeed(data: PostData[]): void

  /**
   * Static method
   * @param detail: {}
   * @param key: string
   * @param value: string
   * Set key value
   */
  // abstract _setDetail(detail: object, key: string, value: string): object;

  abstract setDetail(key: string, value: string): void

  abstract toJson(): CompetitionJsonRequest

  constructor(
    tag: string,
    name: string,
    is_host: boolean,
    images: string[],
    max_image?: number
  ) {
    this.tag = tag
    this.name = name
    this.is_host = is_host
    this.images = images
    this.max_image = max_image === undefined ? 1 : max_image
  }
}

export default class Competition implements AbstractCompetition {
  [k: string]: any

  key?: string | undefined
  tag: string
  name: string
  is_host: boolean
  post_count?: number | undefined
  participated?: boolean | undefined
  is_active?: boolean | undefined
  start?: Date | undefined
  end?: Date | undefined
  result?: Date | undefined
  images: string[]
  hobbies?: Hobby[]
  details?: object | undefined
  user_host?: string | undefined
  judged_by_user?: boolean | undefined
  is_public_competition?: boolean | undefined
  banned_users?: string[] | User[] | undefined
  banned_posts?: string[] | PostData[] | undefined
  max_image?: number | undefined
  tabs?: {[key:string]: string}
  current_tab?: string
  

  format = '%d-%m-%Y %H:%M:%S %z'

  constructor(tag: string, name: string, images: string[], max_image?: number) {
    this.tag = tag
    this.name = name
    this.is_host = false
    this.images = images
    this.max_image = max_image === undefined ? 1 : max_image
  }

  toJson(): CompetitionJsonRequest {
    if (
      this.start != undefined &&
      this.end != undefined &&
      this.result != undefined &&
      this.details != undefined &&
      this.hobbies != undefined
    ) {
      return {
        "name": this.name,
        "tag": this.tag,
        "judged_by_user": this.judged_by_user ? 1 : 0,
        "start": Competition.formatDate(this.start),
        "end": Competition.formatDate(this.end),
        "result": Competition.formatDate(this.result),
        "details": this.details,
        "images": this.images,
        "hobbies": this.hobbies === undefined ? [] : this.hobbies.map(value => value.code_name)
      } as CompetitionJsonRequest;

    }
    return {} as CompetitionJsonRequest
  }

  leaderboard = [] as  CompetitionLeaderboard[];
  feed = [] as PostData[];
  is_ended?: boolean
  is_finished?: boolean
  host?: User

  appendLeaderboard(data: CompetitionLeaderboard[]): void {
    this.leaderboard.concat(data);
  }
  appendFeed(data: PostData[]): void {
    this.feed.concat(data);
  }

  setTabs(tabs: {[key: string]: string}):void{
    this.tabs = tabs
  }

  setHost(host:User): void {
    this.host = host
  }


  // static isTagUnique(tag: string): Promise<boolean> {

  // }

  setIsHost(is_host: boolean): void {
    this.is_host = is_host
  }

  static dumpImage(image: string): void {
    URL.revokeObjectURL(image)
  }

  imageManipulate(data: {
    image?: string | undefined
    index?: number | undefined
  }): void {
    this.images = Competition._imageManipulate(this.images, 1, data)
  }

  static _imageManipulate(
    array: string[],
    max_image: number,
    data: { image?: string | undefined; index?: number | undefined }
  ): string[] {
    if (
      data.index != undefined &&
      data.image == undefined &&
      data.index < array.length
    ) {
      let revokable = array[data.index]
      array.splice(data.index, 1)
      Competition.dumpImage(revokable)
    } else if (data.index === undefined && data.image != undefined) {
      if (array.length + 1 <= max_image) {
        array.push(data.image)
      } else {
        let revokable = array[array.length - 1]
        array[array.length - 1] = data.image
        Competition.dumpImage(revokable)
      }
    } else if (
      data.index != undefined &&
      data.image != undefined &&
      data.index < array.length
    ) {
      let revokable = array[data.index]
      array[data.index] = data.image
      Competition.dumpImage(revokable)
    }
    return array
  }

  rename(name: string): void {
    this.name = name
  }
  static _setHobbies(
    array: Hobby[],
    hobbies?: Hobby[],
    rm_hobbies?: Hobby[]
  ): Hobby[] {
    if (hobbies != undefined) {
      array.concat(hobbies)
    }
    if (rm_hobbies != undefined) {
      array = array.filter((value: Hobby) => !rm_hobbies.includes(value))
    }
    return array
  }
  setHobbies(hobbies?: Hobby[], rm_hobbies?: Hobby[]): void {
    this.hobbies = Competition._setHobbies(
      this.hobbies === undefined ? [] : this.hobbies,
      hobbies,
      rm_hobbies
    )
  }
  setStartDate(time: Date): void {
    this.start = time
    this.start.setHours(12, 0, 0)
  }
  setEndDate(time: Date): void {
    this.end = time
    this.end.setHours(12, 0, 0)
  }
  setResultDate(time: Date): void {
    this.result = time
    this.result.setHours(12, 0, 0)
  }

  static formatDate(time: Date): string {
    return `${time.getDate()}-${time.getMonth() +1}-${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} ${time.getTimezoneOffset()}`;
  }


  appendHobby(hobby: Hobby): void{
    if(this.hobbies === undefined) this.hobbies = [] as Hobby[];
    this.hobbies.push(hobby);
  }

  static parseDate(time: string): Date {
    let date = new Date()
    let parsed = Date.parse(time)
    date.setTime(parsed)
    date.setHours(12, 0, 0)
    return date
  }

  static _setDetail(detail: any, key: string, value: string): object {
    detail[key] = value
    return detail
  }
  setDetail(key: string, value: string): void {
    this.details = Competition._setDetail(
      this.details === undefined ? {} : this.details,
      key,
      value
    )
  }

  setDetails(details:object): void {
    for(const [key, value] of Object.entries(details)){
      this.setDetail(key,value);
    }
  }

  static boolOperator(val: number | unknown): boolean {
    return val === 1
  }

  static fromJson(data: any): Competition | void {
    let competition = new Competition(
      data['tag'],
      data['name'],
      data['avatar'],
      data['avatar'].length
    )
    let number_bool_conversion_required = [
      'is_host',
      'participated',
      'is_active',
      'judged_by_user',
      'is_public_competition'
    ]
    for (let [key, value] of Object.entries(data)) {
      if (number_bool_conversion_required.includes(key)) {
        value = Competition.boolOperator(value)
      } else if (['start', 'end', 'result'].includes(key)) {
        value = Competition.parseDate(value as string)
      }
      competition[key] = value
    }
    return competition
  }

  static fromViewJSON(data: ViewJson): Competition {
    let competition = new Competition(data.tag, data.name, data.images, data.images.length);
    competition.setStartDate(Competition.parseDate(data.start));
    competition.setEndDate(Competition.parseDate(data.end));
    competition.setResultDate(Competition.parseDate(data.result));
    competition.setTabs(data.tabs);
    competition.current_tab = data.current_tab;
    competition.is_ended = Competition.boolOperator(data.is_ended);
    competition.is_finished = Competition.boolOperator(data.is_finished);
    competition.setIsHost(Competition.boolOperator(data.is_host));
    switch(data.current_tab){
      case "About":
           if((data.body as AboutData).details != undefined){
             for(const [key, value] of Object.entries((data.body as AboutData).details)){
               competition.setDetail(key, value);
             }
             let host = (data.body as AboutData).host;
             competition.setHost({avatar: host.avatar, name: host.name, 
              username: host.username} as User);
             let hobbies = (data.body as AboutData).hobbies;
             competition.setHobbies(hobbies);
           }
           break;
      case "Feed": 
           if((data.body as PostData[]).length > 0){
             competition.appendFeed(data.body as PostData[]);
           }
           break;
      case "Leaderboard": 
           competition.appendLeaderboard(data.body as CompetitionLeaderboard[]);
           break;
    }
    return competition;
  }

}
