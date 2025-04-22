import { fontSizes } from "@src/utils/constants";
import { TextObelix } from "../Text";
import type { DefaultTheme } from "styled-components/native";
import styled from "styled-components/native";
import { scale } from "@src/utils/scaleFunctions";

// :: BUTTONS
export const ButtonsText = styled(TextObelix)`
	font-size: ${scale(fontSizes.Xlarge)}px;
	color: ${(props: DefaultTheme) => props?.theme?.txtGrayColor};
`;

export const ButtonsContainer = styled.View`
	width: 86%;
	height: 25%;
	top: 10%;
	flex-direction: column;
	justify-content: space-around;
`;

export const ButtonSettings = styled.TouchableOpacity`
	width: 100%;
	height: 32%;
	border-radius: 10px;
	align-items: center;
	justify-content: center;
	background-color: ${(props: DefaultTheme) => props?.theme?.blueColor};
`;

export const ButtonPlay = styled.TouchableOpacity`
	width: 100%;
	height: 34%;
	border-radius: 10px;
	align-items: center;
	justify-content: center;
	background-color: ${(props: DefaultTheme) => props?.theme?.pinkColor};
`;