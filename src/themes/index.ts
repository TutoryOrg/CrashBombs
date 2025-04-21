import "styled-components/native";
import type { DefaultTheme } from "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		themeName: string;
		bgColor: string;
		bgColorDark: string;
		blackColor: string;
		redColor: string;
		blueColor: string;
		lightGray: string;
		pinkColor: string;
		txtColor: string;
		txtGrayColor: string;
	}
}

export const lightTheme: DefaultTheme = {
	themeName: "lightTheme",
	bgColor: "#282E3D",
	bgColorDark: "#1f2430",
	txtColor: "#FFFFFF",
	txtGrayColor: "#01232F",
	blackColor: "black",
	redColor: "red",
	blueColor: "#00AFEF",
	pinkColor:  "#F6339A",
	lightGray: "#D9D9D9",
};

export const darkTheme: DefaultTheme = {
	themeName: "darkTheme",
	bgColor: "#282E3D",
	bgColorDark: "#1f2430",
	txtColor: "#FFFFFF",
	txtGrayColor: "#01232F",
	blackColor: "black",
	redColor: "red",
	blueColor: "#00AFEF",
	pinkColor:  "#F6339A",
	lightGray: "#D9D9D9",
};
