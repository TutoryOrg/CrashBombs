import { fontSizes } from "@src/utils/constants";
import { TextObelix } from "../Text";
import { verticalScale, scale } from "@src/utils/scaleFunctions";
import styled, { type DefaultTheme } from "styled-components/native";

// :: GLOBAL SCORER
export const ScoreContainer = styled.View`
	width: 80%;
	height: 20%;
	flex-direction: column;
	justify-content: space-between;
`;

export const TopUsersContainer = styled.View<{ index: number }>`
    width: 100%;
    align-self: center;
	align-items: center;
    flex-direction: row;
    justify-content: space-between;
    padding: ${verticalScale(2)}px;
    opacity: ${(props: DefaultTheme) => 1 / (props.index)};
`;

export const TextTile = styled(TextObelix)`
	text-align:center;
	border-top-width: 0px;
	border-left-width: 0px;
	border-right-width: 0px;
    font-size: ${scale(fontSizes.small)}px;
	border-bottom-width: ${verticalScale(2)}px;
	color: ${(props: DefaultTheme) => props?.theme?.txtColor};
	border: 1px solid ${(props: DefaultTheme) => props.theme.txtColor};
`;

export const TextTopUser = styled(TextObelix)`
    font-size: ${scale(fontSizes.xsmall)}px;
`;