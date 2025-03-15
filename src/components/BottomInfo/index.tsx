import { SvgXml } from "react-native-svg";
import { AuthEmail } from "../AuthEmail";
import { isDefined } from "@src/utils/utils";
import { TextLucky } from "../Text";
import { Image, KeyboardAvoidingView, Platform, View } from "react-native";
import { createAvatar } from "@dicebear/core";
import type { Session } from "@supabase/supabase-js";
import { ContainerColumn } from "../Container";
import { avataaarsNeutral } from "@dicebear/collection";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { verticalScale, windowHeight } from "@src/utils/scaleFunctions";
import { Fragment, type Ref, useState } from "react";
import { type IUser, REG_METHOD, REGISTER } from "@src/utils/constants";
import {
	TextInfo,
	InfoButton,
	InfoTitle,
	TextInfoRed,
	InfoSubTitle,
	TextInfoBlue,
	InfoContainer,
	InfoButtonText,
	UserNotContainer,
	UserInfoContainer,
	TextInfoPinkSmall,
	InfoButtonsContainer,
	NotHaveAccountOptions,
} from "./styled";

const UserLoggedInfo = (props: { user: IUser | undefined }) => {
	const { user } = props;

	const avatar = createAvatar(avataaarsNeutral, {
		seed: user?.avatar_url,
		radius: verticalScale(10),
	}).toString();

	return (
		<UserInfoContainer>
			<ContainerColumn>
				<TextInfoBlue>
					Name: <TextInfo> {user?.username} </TextInfo>
				</TextInfoBlue>
				<TextInfoBlue>
					nºRanking: <TextInfo> #{user?.ranking} </TextInfo>
				</TextInfoBlue>
				<TextInfoBlue>
					Last Score: <TextInfo> {user?.lastscore} </TextInfo>
				</TextInfoBlue>
				<TextInfoBlue>
					Best Score: <TextInfoRed> {user?.bestscore} </TextInfoRed>
				</TextInfoBlue>
			</ContainerColumn>
			<SvgXml height={verticalScale(84)} width={verticalScale(84)} xml={avatar} />
		</UserInfoContainer>
	);
};

const UserNotLoggedInfo = (props: { bottomSheetModalRef: Ref<BottomSheetModal>; setSession: (session: Session) => void }) => {
	const { bottomSheetModalRef, setSession } = props;
	const [login, setLogin] = useState<REG_METHOD | undefined>();
	const [singup, setSignUp] = useState<REG_METHOD | undefined>();
	const [register, setRegister] = useState<REGISTER>(REGISTER.LOG_IN);

	const isRegisterLogIn = register === REGISTER.LOG_IN;

	const onRegisterLogIn = () => {
		setSignUp(undefined);
		setRegister(REGISTER.LOG_IN);
	};
	const onRegisterSingUp = () => {
		setLogin(undefined);
		setRegister(REGISTER.SING_UP);
	};

	const onLoginEmail = () => setLogin(REG_METHOD.EMAIL);
	const onSignUpEmail = () => setSignUp(REG_METHOD.EMAIL);

	return (
		<UserNotContainer>
			{singup === REG_METHOD.EMAIL ? (
				<AuthEmail register={register} bottomSheetModalRef={bottomSheetModalRef} setSession={setSession} />
			) : login === REG_METHOD.EMAIL ? (
				<AuthEmail register={register} bottomSheetModalRef={bottomSheetModalRef} setSession={setSession} />
			) : (
				<Fragment>
					<InfoSubTitle>
						<TextInfo>
							Create an <TextInfoBlue>account</TextInfoBlue> or log in and race to the top to win{" "}
						</TextInfo>
						<TextInfoRed>100K!</TextInfoRed>
					</InfoSubTitle>
					<InfoButtonsContainer>
						<InfoButton onPress={isRegisterLogIn ? onLoginEmail : onSignUpEmail}>
							<View style={{ width: "30%", alignItems: "flex-end" }}>
								<Image
									source={require("assets/email.png")}
									style={{ height: verticalScale(26), width: verticalScale(26) }}
								/>
							</View>
							<InfoButtonText children={isRegisterLogIn ? "Log in with email" : "Sing up with email"} />
						</InfoButton>

						{/*<InfoButton onPress={isRegisterLogIn ? onHandleLoginWithGoogle : onHandleSingUpWithGoogle}>
							<View style={{ width: "25%", alignItems: "center" }}>
								<Image source={require("assets/google.png")} style={{ height: verticalScale(20), width: verticalScale(20) }} />
							</View>
							<InfoButtonText children={isRegisterLogIn ? "Log in with google" : "Sing up with google"} />
						</InfoButton>

						<InfoButton onPress={isRegisterLogIn ? onHandleLoginWithFacebook : onHandleSingUpWithFacebook}>
							<View style={{ width: "25%", alignItems: "center" }}>
								<Image source={require("assets/facebook.png")} style={{ height: verticalScale(20), width: verticalScale(20) }} />
							</View>
							<InfoButtonText children={isRegisterLogIn ? "Log in with Facebook" : "Sing up with Facebook"} />
						</InfoButton>

						<InfoButton onPress={isRegisterLogIn ? onHandleLoginWithApple : onHandleSingUpWithApple}>
							<View style={{ width: "25%", alignItems: "center" }}>
								<Image source={require("assets/apple.png")} style={{ height: verticalScale(20), width: verticalScale(20) }} />
							</View>
							<InfoButtonText children={isRegisterLogIn ? "Log in with Apple" : "Sing up with Apple"} />
						</InfoButton> */}
					</InfoButtonsContainer>
				</Fragment>
			)}
			<NotHaveAccountOptions onPress={isRegisterLogIn ? onRegisterSingUp : onRegisterLogIn}>
				{isRegisterLogIn ? (
					<TextInfoPinkSmall>
						Don't have account?
						<TextInfoRed> Sing up.</TextInfoRed>
					</TextInfoPinkSmall>
				) : (
					<TextInfoPinkSmall>
						Already have an account? <TextInfoBlue>Log in! </TextInfoBlue>
					</TextInfoPinkSmall>
				)}
			</NotHaveAccountOptions>
		</UserNotContainer>
	);
};

export const BottomInfo = (props: {
	user: IUser | undefined;
	setSession: (session: Session) => void;
	bottomSheetModalRef: Ref<BottomSheetModal>;
}) => {
	const { bottomSheetModalRef, setSession } = props;
	const { user } = props;
	const isLoggedIn = isDefined(user);

	return (
		<InfoContainer isLoggedIn={isLoggedIn} windowHeight={windowHeight}>
			<InfoTitle>Player Info</InfoTitle>
			{isLoggedIn ? (
				<UserLoggedInfo user={user} />
			) : (
				<UserNotLoggedInfo setSession={setSession} bottomSheetModalRef={bottomSheetModalRef} />
			)}
			<TextLucky>
				Check <TextInfoBlue>www.website.com</TextInfoBlue> for more information!
			</TextLucky>
		</InfoContainer>
	);
};
