export interface ReCaptchaResponse {
    success: boolean;
    challenge_ts: Date;
    hostname: string;
    score: number;
    action: string;
}
