import styled, { type DefaultTheme } from "styled-components/native";

export const GameBackground = styled.View`
    flex: 1;
    background-color: ${(props: DefaultTheme) => props.theme.bgColor};
    align-items: center;  
    justify-content: flex-end;
`;

export const LifeContainer = styled.View`
    width: 96%;
    justify-content: flex-end;
    margin-bottom: 10px;
`;

export const ButtonsContainer = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    height: 15%;
    margin-bottom: 10px;
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
    margin: 0 10px;
`;

export const ModeButton = styled.TouchableOpacity`
    margin: 0 15px;
`;
