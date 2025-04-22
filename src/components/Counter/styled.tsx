import { TextKomi, TextObelix } from "../Text";
import { fontSizes } from "@src/utils/constants";
import styled, { type DefaultTheme } from "styled-components/native";
import { moderateScale, scale, verticalScale } from "@src/utils/scaleFunctions";

// :: COUNTER
export const BlueText = styled(TextObelix)`
    font-size: ${scale(fontSizes.normal)}px;
    color: ${(props: DefaultTheme) => props?.theme?.blueColor};
`;

export const RedText = styled(TextObelix)`
    font-size: ${scale(fontSizes.normal)}px;
    color: ${(props: DefaultTheme) => props?.theme?.redColor};
`;

export const LoginText = styled(TextKomi)`
	width: 120%;
	text-align: center;
	font-size: ${moderateScale(fontSizes.small)}px;
`;

export const TopFiveText = styled(TextObelix)`
    font-size: ${scale(fontSizes.xsmall)}px;
`;

export const CounterNumber = styled(TextKomi)`
	width: 110%;
	height: 100%;
	text-align: center;
	font-size: ${verticalScale(fontSizes.XXXlarge)}px;
	background-color: ${(props: DefaultTheme) => props?.theme?.bgColor};
`;

export const CounterContainer = styled.TouchableOpacity`
	width: 86%;
	height: 12%;
	margin-top: 8%;
	margin-bottom: 5%;
	align-items: center;
	flex-direction: column;
    justify-content: space-between;
`;