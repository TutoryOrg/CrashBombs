import "styled-components/native";
import type { DefaultTheme } from "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		themeName: string;
		bgColor: string;
		bgColorDimmed: string;
		txtColor: string;
		selected: string;
		txtSelected: string;
		borderColor: string;
		gray: string;
		grayDimmed: string;
		pro0: string;
		pro1: string;
		pro2: string;
		pro3: string;
		pro4: string;
		pro5: string;
	}
}

export const lightTheme: DefaultTheme = {
	themeName: "lightTheme",
	bgColor: "#FFFFFF",
	bgColorDimmed: "#ffffff80",
	txtColor: "#000000",
	selected: "#000000",
	txtSelected: "#FFFFFF",
	borderColor: "#000000",
	gray: "#dedede",
	grayDimmed: "#dedede80",
	pro0: "#ffffff",
	pro1: "#e9ecef",
	pro2: "#ced4da",
	pro3: "#868e96",
	pro4: "#5C6166",
	pro5: "#000000",
};

export const darkTheme: DefaultTheme = {
	themeName: "darkTheme",
	bgColor: "#000000",
	bgColorDimmed: "#00000080",
	txtColor: "#FFFFFF",
	selected: "#FFFFFF",
	txtSelected: "#000000",
	borderColor: "#FFFFFF",
	gray: "#565555",
	grayDimmed: "#56555580",
	pro0: "#000000",
	pro1: "#343a40",
	pro2: "#868e96",
	pro3: "#ced4da",
	pro4: "#D1D4D7",
	pro5: "#ffffff",
};
