class PublicPathManager {

    #pulbicPath:Array<string> = [
        '/404',
        '/500',
        "/toDoList",
        "/post",
        //"/kakao",
        //"/toDoList",
    ]

    constructor() {

    }

    #getPublicPath():Array<string>{
        return this.#pulbicPath;
    }

    get path():Array<string>{
        return this.#getPublicPath()
    }

}

const publicPathManager = new PublicPathManager();

export { publicPathManager as PublicPathManager }