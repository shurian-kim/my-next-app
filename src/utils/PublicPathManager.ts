class PublicPathManager {

    #pulbicPath: string[] = [
        '/404',
        '/500',
        "/toDoList",
        "/requestMapper",
        // "/kakao",
        // "/toDoList",
    ]

    constructor() { }

    #getPublicPath(): string[] {
        return this.#pulbicPath;
    }

    get path(): string[] {
        return this.#getPublicPath()
    }

}

const publicPathManager = new PublicPathManager();

export { publicPathManager as PublicPathManager }