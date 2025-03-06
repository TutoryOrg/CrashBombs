export enum Screens {
	HOME = "Home",
	GAME = "Game",
}

export enum REGISTER {
	LOG_IN = "LOG_IN",
	SING_UP = "SING_UP",
}

export enum REG_METHOD {
	EMAIL = "EMAIL",
	GMAIL = "GMAIL",
}

export const fontSizes = {
	xsmall: 12,
	small: 14,
	normal: 18,
	large: 24,
	Xlarge: 35,
	XXlarge: 42,
	XXXlarge: 50,
};

export interface IUser {
	id: string;
	ranking: string;
	username: string;
	bestScore: string;
	lastScore: string;
}
