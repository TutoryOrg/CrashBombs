import styled, { type DefaultTheme } from "styled-components/native";

export const SafeContainer = styled.SafeAreaView`
	flex: 1;
	background-color: ${(props: DefaultTheme) => props.theme.bgColor};
`;