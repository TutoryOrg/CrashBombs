import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import type { IUser } from "@src/utils/constants";
import { verticalScale } from "@src/utils/scaleFunctions";
import { isDefined } from "@src/utils/utils";
import { type Ref, Fragment } from "react";
import { CounterContainer, CounterNumber, LoginText, RedText, BlueText, TopFiveText } from "./styled";
import { Image } from "react-native";

export const Counter = (props: { user: IUser | undefined; count: string; bottomSheetModalRef: Ref<BottomSheetModal> }) => {
    const { user, count, bottomSheetModalRef } = props;
    // const isLoggedIn = isDefined(user);
    const isLoggedIn = isDefined(user);

    const onHandleLogin = () => {
        if (!isLoggedIn) {
            bottomSheetModalRef?.current?.present();
        }
    };

    return (
        <CounterContainer disabled={isLoggedIn} onPress={onHandleLogin}>
            <CounterNumber>{count}</CounterNumber>
            {!isLoggedIn ? (
                <Fragment>
                    <LoginText>
                        Log in for a chance to win <RedText>100K</RedText>
                    </LoginText>
                    <LoginText>
                        <BlueText>sing up</BlueText> or <BlueText>log in</BlueText>
                    </LoginText>
                </Fragment>
            ) : (
                <Fragment>
                    <LoginText>
                        Be <Image source={require("assets/star.png")} style={{ height: verticalScale(12), width: verticalScale(12) }} />1
                        and claim your <RedText>$100K!</RedText>
                    </LoginText>
                    <TopFiveText>
                        Make it to the top <RedText>5</RedText> and you could win <BlueText>$1M!</BlueText>
                    </TopFiveText>
                </Fragment>
            )}
        </CounterContainer>
    );
};