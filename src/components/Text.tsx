import styled from "styled-components/native";
import { fontSizes } from "@src/utils/constants";
import type { DefaultTheme } from "styled-components";
import { verticalScale } from "@src/utils/scaleFunctions";

export const TextObelix = styled.Text`
	font-family: "obelix";
	font-size: ${fontSizes.small}px;
	color: ${(props: DefaultTheme) => props.theme.txtColor};
`;

export const TextKomi = styled.Text`
	font-family: "komi";
	font-size: ${fontSizes.small}px;
	color: ${(props: DefaultTheme) => props.theme.txtColor};
`;

export const TextLucky = styled.Text`
	font-family: "lucky";
	font-size: ${verticalScale(fontSizes.xsmall)}px;
	color: ${(props: DefaultTheme) => props.theme.txtColor};
`;
