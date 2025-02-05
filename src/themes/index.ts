import "styled-components/native";
import type { DefaultTheme } from "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		themeName: string;
		bgColor: string;
		txtColor: string;
		txtGrayColor: string;
	}
}

export const lightTheme: DefaultTheme = {
	themeName: "lightTheme",
	bgColor: "#282E3D",
	txtColor: "#FFFFFF",
	txtGrayColor: "#01232F",
};

export const darkTheme: DefaultTheme = {
	themeName: "darkTheme",
	bgColor: "#282E3D",
	txtColor: "#FFFFFF",
	txtGrayColor: "#01232F",
};
