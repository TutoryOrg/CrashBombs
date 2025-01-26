import styled from "styled-components/native";
import { fontSizes } from "@src/utils/constants";
import { verticalScale } from "@src/utils/scaleFunctions";
import { TextKomi, TextObelix } from "@components/Text";
import type { DefaultTheme } from "styled-components";

// :: Screen Hoome Container
export const ViewContainer = styled.SafeAreaView`
    width: 100%;
    height: 100%;
    align-items: center;
    padding-top: ${verticalScale(45)}px;
    background-color: ${(props: DefaultTheme) => props.theme.bgColor};
`;

export const HomeTitle = styled(TextKomi)`
    width: 80%;
    height: 20%;
    text-align: center;
    font-size: ${fontSizes.XXlarge}px;
    line-height: ${verticalScale(35)}px;
    padding-top: ${verticalScale(35)}px;
`;

// :: Header
export const HeaderContainer = styled.View<{ isLoggedIn: boolean }>`
    height: 5%;
    width: 100%;
    align-items: center;
	flex-direction: row;
	padding-horizontal: 20px;
    justify-content: ${(props: DefaultTheme) => (props.isLoggedIn ? "space-between" : "flex-end")};
`;

export const UserStatus = styled.View<{ isLoggedIn: boolean }>`
	width: 32%;
	flex-direction: row;
	justify-content: space-between;
	display: ${(props: DefaultTheme) => (props.isLoggedIn ? "flex" : "none")};	
`;

export const TextUser = styled(TextObelix)`
	font-size: ${verticalScale(fontSizes.xsmall)}px;
`;

export const Image = styled.Image<{ isLoggedIn: boolean }>`
    width: ${verticalScale(20)}px; 
    height: ${verticalScale(20)}px;
`;

// :: GlobalScore

export const ScoreContainer = styled.View`
	width: 80%;
	height: 20%;
	flex-direction: column;
	justify-content: space-between;
`;

export const TopUsersContainer = styled.View<{ index: number }>`
    width: 100%;
    align-self: center;
    flex-direction: row;
    justify-content: space-between;
    padding: ${verticalScale(2)}px;
    opacity: ${(props: DefaultTheme) => 1 / (props.index + 0.75)};
`;

export const TextTile = styled(TextObelix)`
	border-top-width: 0px;
	border-left-width: 0px;
	border-right-width: 0px;
	border-bottom-width: ${verticalScale(2)}px;
	border: 1px solid ${(props: DefaultTheme) => props.theme.txtColor};
`;

export const TextTopUser = styled(TextObelix)`
    font-size: ${fontSizes.xsmall}px;
`;
