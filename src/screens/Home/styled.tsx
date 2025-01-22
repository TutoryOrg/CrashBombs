import styled from "styled-components/native";
import type { DefaultTheme } from "styled-components";
import { fontSizes } from "@src/utils/constants";

export const SafeAreaStyled = styled.SafeAreaView`
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: ${(props: DefaultTheme) => props.theme.bgColor};
`;

export const TextStyled = styled.Text`
    font-size: ${fontSizes.XXlarge}px;
    color: ${(props: DefaultTheme) => props.theme.txtColor};
`;
