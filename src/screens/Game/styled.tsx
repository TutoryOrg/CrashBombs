import styled, { type DefaultTheme } from "styled-components/native";

export const GameBackground = styled.View`
    flex: 1;
    background-color: ${(props: DefaultTheme) => props.theme.bgColor};
    align-items: center;  
    justify-content: center;
`;

export const ButtonsContainer = styled.View`
    position: absolute;
    bottom: 10px;
    width: 100%;
    height: 120px;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

export const ShapeContainer = styled.View`
    flex-direction: row;
`;

export const ControlsContainer = styled.View`
    flex-direction: column;
    height: 100%;
    justify-content: space-around;
`;

export const ShapeButton = styled.TouchableOpacity`
    activeOpacity: 1;
    margin: 0 10px;
`;

export const ModeButton = styled.TouchableOpacity`
    activeOpacity: 1;
    margin: 0 15px;
`;
