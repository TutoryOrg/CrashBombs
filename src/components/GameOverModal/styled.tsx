import styled from "styled-components/native";
import { verticalScale } from "@src/utils/scaleFunctions";
import { TextObelix } from "../Text";
import { fontSizes } from "@src/utils/constants";

// Add this styled component near your other styled components
export const GameOverModalContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
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
  font-size: ${verticalScale(fontSizes.XXXlarge)}px;
  color: white;
  margin-bottom: ${verticalScale(20)}px;
`;

export const ModalButton = styled.TouchableOpacity`
  width: 100%;
  padding: ${verticalScale(10)}px;
  background-color: #555;
  border-radius: 5px;
  margin-top: ${verticalScale(10)}px;
  align-items: center;
`;

export const ModalButtonText = styled(TextObelix)`
  font-size: ${verticalScale(fontSizes.large)}px;
  color: white;
`;
