import "styled-components/native";
import type { DefaultTheme } from "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		themeName: string;
		bgColor: string;
		txtColor: string;
	}
}

export const lightTheme: DefaultTheme = {
	themeName: "lightTheme",
	bgColor: "#282E3D",
	txtColor: "#FFFFFF",
};

export const darkTheme: DefaultTheme = {
	themeName: "darkTheme",
	bgColor: "#282E3D",
	txtColor: "#FFFFFF",
};
