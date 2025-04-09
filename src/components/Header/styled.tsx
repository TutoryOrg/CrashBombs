import { fontSizes } from "@src/utils/constants";
import { TextObelix } from "../Text";
import { verticalScale } from "@src/utils/scaleFunctions";
import styled, { type DefaultTheme } from "styled-components/native";

// :: HEADER
export const HeaderContainer = styled.View<{ isLoggedIn: boolean }>`
    height: 5%;
    width: 100%;
    align-items: center;
	flex-direction: row;
	padding-horizontal: 20px;
    justify-content: ${(props: DefaultTheme) => (props.isLoggedIn ? "space-between" : "flex-end")};
`;

export const UserStatus = styled.View<{ isLoggedIn: boolean }>`
	width: 80%;
	flex-direction: row;
	display: ${(props: DefaultTheme) => (props.isLoggedIn ? "flex" : "none")};	
`;

export const TextUser = styled(TextObelix)`
	font-size: ${verticalScale(fontSizes.xsmall)}px;
`;

export const Image = styled.Image<{ isLoggedIn: boolean }>`
    width: ${verticalScale(20)}px; 
    height: ${verticalScale(20)}px;
`;