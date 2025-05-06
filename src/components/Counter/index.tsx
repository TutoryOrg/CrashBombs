import { Image } from "react-native";
import { isDefined } from "@src/utils/utils";
import type { IUser } from "@src/utils/constants";
import { verticalScale } from "@src/utils/scaleFunctions";
import { type Ref, Fragment } from "react";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { CounterContainer, CounterNumber, LoginText, RedText, BlueText, TopFiveText } from "./styled";

export const Counter = (props: { user: IUser | undefined; isSafe: boolean; count: string; bottomSheetModalRef: Ref<BottomSheetModal> }) => {
    const { user, isSafe, count, bottomSheetModalRef } = props;
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
                    {isSafe ? (
                        <>
                            <LoginText width="90%">
                                🚀Log in for a chance to be in the <RedText>Global Score!</RedText>
                            </LoginText>
                        </>
                    ) : (
                        <>
                            <LoginText>
                                🚀Log in for a chance to win <RedText>100K💸</RedText>
                            </LoginText>
                        </>
                    )}
                    <LoginText>
                        <BlueText>sing up</BlueText> or <BlueText>log in</BlueText>
                    </LoginText>
                </Fragment>
            ) : (
                <Fragment>
                    {isSafe ? (
                        <>
                            <LoginText>
                                Be 🥇1 and claim your <RedText>price! 🏆</RedText>
                            </LoginText>
                            <TopFiveText>
                                Make it to the top <BlueText>5</BlueText> in the world
                            </TopFiveText>
                        </>
                    ) : (
                        <>
                            <LoginText>
                                Be <Image source={require("assets/star.png")} style={{ height: verticalScale(12), width: verticalScale(12) }} />1
                                and claim your <RedText>$100K!💸</RedText>
                            </LoginText>
                            <TopFiveText>
                                Make it to the top <RedText>5</RedText> and you could win <BlueText>$1M!</BlueText>
                            </TopFiveText>
                        </>
                    )}
                </Fragment>
            )}
        </CounterContainer>
    );
};
