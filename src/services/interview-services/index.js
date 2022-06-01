const { default: RequestApiHelper } = require("../request-api-helper")

export default class InterviewServices {
    static getAnswer = async (array) => {
        return RequestApiHelper.pos('/math/getAnswer', { array });
    }
}