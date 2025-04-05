import { verticalScale } from "@src/utils/scaleFunctions";
import styled, { type DefaultTheme } from "styled-components/native";

export const GameBackground = styled.View`
    flex: 1;
    align-items: center;  
    justify-content: flex-end;
    background-color: ${(props: DefaultTheme) => props.theme.bgColorDark};
`;

export const LifeContainer = styled.View`
    width: 96%;
    justify-content: flex-end;
    margin-bottom: 10px;
    z-index: 1;
`;

export const ButtonsContainer = styled.View`
    width: 96%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    z-index: 1;
    height: 18%;
    background-color: ${(props: DefaultTheme) => props.theme.bgColorDark};
    bottom: 10px;
`;

export const ShapeContainer = styled.View`
    width: 65%;
    height: 100%;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
`;

export const ControlsContainer = styled.View`
    height: 94%;
    flex-direction: column;
    justify-content: space-between;
`;

export const ShapeButton = styled.TouchableOpacity``;

export const ModeButton = styled.TouchableOpacity<{ mode: string; selected: boolean }>`
    background-color: ${(props: DefaultTheme) => (props?.mode === "red" ? props.theme.redColor : props.theme.blueColor)};
    opacity: ${(props: DefaultTheme) => (props?.selected ? 1 : 0.2)};
    padding-horizontal: ${verticalScale(8)}px;
    padding-vertical: ${verticalScale(4)}px;
    border-radius: ${verticalScale(15)}px;
    margin:  ${verticalScale(2)}px;
`;
