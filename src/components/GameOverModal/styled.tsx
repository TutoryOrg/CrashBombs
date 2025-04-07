import styled, { type DefaultTheme } from "styled-components/native";
import { scale, verticalScale } from "@src/utils/scaleFunctions";
import { TextObelix } from "../Text";
import { fontSizes } from "@src/utils/constants";

// Add this styled component near your other styled components
export const GameOverModalContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right:0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
`;

export const ModalContent = styled.View`
  width: 80%;
  padding: ${verticalScale(20)}px;
  background-color: #333;
  border-radius: 10px;
  align-items: center;
`;

export const ModalTitle = styled(TextObelix)`
  color: ${(props: DefaultTheme) => props.theme.txtColor};
  font-size: ${verticalScale(fontSizes.XXXlarge)}px;
  margin-bottom: ${verticalScale(20)}px;
  width: 100%;
  text-align: center;
`;

export const ModalButtonOp = styled.TouchableOpacity<{ disabled?: boolean }>`
  width: 48%;
  padding: ${verticalScale(10)}px;
  background-color: #555;
  border-radius: 5px;
  margin-top: ${verticalScale(10)}px;
  align-items: center;
  text-align: center;
  justify-content: center;
  opacity: ${(props: { disabled: boolean }) => (props.disabled ? 0.6 : 1)};
  background-color: ${(props: DefaultTheme) => props.theme.blueColor};
`;

export const ModalButton = styled.TouchableOpacity`
  background-color: ${(props: DefaultTheme) => props.theme.pinkColor};
  width: 100%;
  border-radius: 5px;
  align-items: center;
  padding: ${verticalScale(10)}px;
  margin-top: ${verticalScale(10)}px;
`;

export const ModalButtonText = styled(TextObelix)`
  font-size: ${scale(fontSizes.large)}px;
	color: ${(props: DefaultTheme) => props?.theme?.txtGrayColor};
`;
