import styled from "styled-components/native";
import { fontSizes } from "@src/utils/constants";
import { verticalScale } from "@src/utils/scaleFunctions";
import type { DefaultTheme } from "styled-components";

export const SafeAreaStyled = styled.SafeAreaView`
    width: 100%;
    height: 100%;
    align-items: center;
    padding-top: ${verticalScale(45)}px;
    background-color: ${(props: DefaultTheme) => props.theme.bgColor};
`;

export const HeaderStyled = styled.View<{ isUser: boolean }>`
    height: 5%;
    width: 100%;
	padding-horizontal: 20px;
	flex-direction: row;
    align-items: center;
    justify-content: ${(props: DefaultTheme) => (props.isUser ? "space-between" : "flex-end")};
`;

export const UserLoggedIn = styled.View<{ isUser: boolean }>`
	width: 32%;
	flex-direction: row;
	justify-content: space-between;
	display: ${(props: DefaultTheme) => (props.isUser ? "flex" : "none")};	
`;

export const TextUser = styled.Text`
    font-family: "obelix";
	font-size: ${verticalScale(fontSizes.small)}px;
	color: ${(props: DefaultTheme) => props.theme.txtColor};
`;

export const TitleStyled = styled.Text`
    width: 100%;
    text-align: center;
    font-size: ${fontSizes.XXlarge}px;
    font-family: "komi";
    color: ${(props: DefaultTheme) => props.theme.txtColor};
`;

export const ImageStyled = styled.Image<{ isUser: boolean }>`
	source: ${(props: DefaultTheme) => (props.isUser ? require("assets/loguser.png") : require("assets/user.png"))}; 
	width: ${verticalScale(20)}px;
	height: ${verticalScale(20)}px;
`;
