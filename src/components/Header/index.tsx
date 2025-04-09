import { SvgXml } from "react-native-svg";
import { Image } from "react-native";
import type { Ref } from "react";
import { isDefined } from "@src/utils/utils";
import type { IUser } from "@src/utils/constants";
import { createAvatar } from "@dicebear/core";
import { verticalScale } from "@src/utils/scaleFunctions";
import { avataaarsNeutral } from "@dicebear/collection";
import { TouchableOpacity } from "react-native";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { HeaderContainer, UserStatus, TextUser } from "./styled";

export const Header = (props: { user: IUser | undefined; bottomSheetModalRef: Ref<BottomSheetModal> }) => {
    const { user, bottomSheetModalRef } = props;
    const isLoggedIn = isDefined(user);

    const avatar = createAvatar(avataaarsNeutral, {
        seed: user?.avatar_url,
        radius: verticalScale(45),
    }).toString();

    return (
        <HeaderContainer isLoggedIn={isLoggedIn}>
            <UserStatus isLoggedIn={isLoggedIn}>
                <TextUser># {user?.ranking}</TextUser>
                <TextUser>{`  ${user?.username}`}</TextUser>
            </UserStatus>
            <TouchableOpacity onPress={() => bottomSheetModalRef?.current?.present()}>
                {isLoggedIn ? (
                    <SvgXml height={verticalScale(40)} width={verticalScale(40)} xml={avatar} />
                ) : (
                    <Image height={verticalScale(40)} width={verticalScale(40)} source={require("assets/user.png")} />
                )}
            </TouchableOpacity>
        </HeaderContainer>
    );
};

