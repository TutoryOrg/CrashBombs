import type { Ref } from "react";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ButtonsContainer, ButtonSettings, ButtonsText, ButtonPlay } from "./styled";

export const Buttons = (props: { bottomSheetModalRef: Ref<BottomSheetModal>; onHandleClickPlay: () => void }) => {
    const { bottomSheetModalRef, onHandleClickPlay } = props;
    const handleOpenBottomSheet = () => bottomSheetModalRef?.current?.present();
    const handleCloseBottomSheet = () => bottomSheetModalRef?.current?.dismiss();
    return (
        <ButtonsContainer>
            <ButtonSettings onPress={handleOpenBottomSheet}>
                <ButtonsText>Info</ButtonsText>
            </ButtonSettings>
            <ButtonPlay onPress={onHandleClickPlay}>
                <ButtonsText>Play</ButtonsText>
            </ButtonPlay>
        </ButtonsContainer>
    );
};