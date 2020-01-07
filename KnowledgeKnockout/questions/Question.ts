export class Question {
    public questionId: number;
    public blockId: number;
    public topicId: number;
    public content: string;
    public imgSrc: string;
    public constructor(questionId: number, blockId: number, topicId: number, content: string, imgSrc: string) {
        this.questionId = questionId;
        this.blockId = blockId;
        this.topicId = topicId;
        this.content = content;
        this.imgSrc = imgSrc;
    }
}