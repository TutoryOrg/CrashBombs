import { TextKomi } from "@src/components/Text";
import { fontSizes } from "@src/utils/constants";
import { verticalScale, windowHeight, windowWidth } from "@src/utils/scaleFunctions";
import styled, { type DefaultTheme } from "styled-components/native";

export const GameBackground = styled.View`
    flex: 1;
    align-items: center;  
    justify-content: flex-end;
    background-color: ${(props: DefaultTheme) => props.theme.bgColorDark};
`;

export const TextTopScore = styled(TextKomi)`
    width: 100%;
    height: 6%;
    text-align: right;
    z-index: 1;
    position: absolute;
    top: 0px;
    right: 0px;
    width: 40%;
    top: 10px;
    margin-left: 10px;
    font-size: ${verticalScale(fontSizes.small)}px;
`;

export const XButtonContainer = styled.TouchableOpacity`
    z-index: 1;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 10%;
    margin-right: 10px;
`;

export const XButton = styled(TextKomi)`
    bottom: 10px;
    text-align: center;
    font-size: ${verticalScale(fontSizes.Xlarge)}px;
`;

export const TextCounter = styled(TextKomi)`
    width: 100%;
    opacity: 0.8;
    position: absolute;
    top: ${windowHeight / 8}px;
    text-align: center;
    font-size: ${verticalScale(fontSizes.XXXlarge) + 24}px;
`;

export const LifeContainer = styled.View`
    z-index: 1;
    width: 96%;
    justify-content: flex-end;
    margin-bottom: 15px;
`;

export const ButtonsContainer = styled.View`
    width: 96%;
    z-index: 1;
    height: 18%;
    bottom: 10px; 
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
