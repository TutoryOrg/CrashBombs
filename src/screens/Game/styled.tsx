import { TextKomi } from "@src/components/Text";
import { fontSizes } from "@src/utils/constants";
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

export const XButtonContainer = styled.TouchableOpacity`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 10%;
    margin: 10px;
`;

export const XButton = styled(TextKomi)`
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: ${verticalScale(fontSizes.Xlarge)}px;
`;

export const TextCounter = styled(TextKomi)`
    width: 100%;
    opacity: 0.8;
    margin-bottom: 70%;
    text-align: center;
    font-size: ${verticalScale(fontSizes.XXXlarge) + 24}px;
`;

export const ButtonsContainer = styled.View`
    width: 96%;
    z-index: 1;
    height: 18%;
    bottom: 20px; 
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${(props: DefaultTheme) => props.theme.bgColorDark};
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
