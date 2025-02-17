import { type IUser, REGISTER } from "@src/utils/constants";
import { verticalScale } from "@src/utils/scaleFunctions";
import { isDefined } from "@src/utils/utils";
import { useState } from "react";
import { TextLucky } from "../Text";
import { Image, TouchableOpacity, View } from "react-native";
import { ContainerColumn } from "../Container";
import {
	UserInfoContainer,
	TextInfoBlue,
	TextInfo,
	TextInfoRed,
	UserNotContainer,
	InfoSubTitle,
	InfoButtonsContainer,
	InfoButton,
	InfoButtonText,
	TextInfoPinkSmall,
	InfoContainer,
	InfoTitle,
} from "./styled";

const UserLoggedInfo = (props: { user: IUser | undefined }) => {
	const { user } = props;

	return (
		<UserInfoContainer>
			<ContainerColumn>
				<TextInfoBlue>
					Name: <TextInfo> {user?.name} </TextInfo>
				</TextInfoBlue>
				<TextInfoBlue>
					nºRanking: <TextInfo> #{user?.ranking} </TextInfo>
				</TextInfoBlue>
				<TextInfoBlue>
					Last Score: <TextInfo> {user?.lastScore} </TextInfo>
				</TextInfoBlue>
				<TextInfoBlue>
					Best Score: <TextInfoRed> {user?.bestScore} </TextInfoRed>
				</TextInfoBlue>
			</ContainerColumn>
			<Image source={require("assets/loguser.png")} style={{ height: verticalScale(100), width: verticalScale(100) }} />
		</UserInfoContainer>
	);
};

const UserNotLoggedInfo = () => {
	const [register, setRegister] = useState<REGISTER>(REGISTER.LOG_IN);
	const isRegisterLogIn = register === REGISTER.LOG_IN;

	const onRegisterLogIn = () => setRegister(REGISTER.LOG_IN);
	const onRegisterSingUp = () => setRegister(REGISTER.SING_UP);

	const onLoginEmail = () => console.log("onLoginEmail");
	const onSignUpEmail = () => console.log("onSignUpEmail");

	return (
		<UserNotContainer>
			<InfoSubTitle>
				<TextInfo>
					Create an <TextInfoBlue>account</TextInfoBlue> or log in and race to the top to win{" "}
				</TextInfo>
				<TextInfoRed>100K!</TextInfoRed>
			</InfoSubTitle>
			<InfoButtonsContainer>
				<InfoButton onPress={isRegisterLogIn ? onLoginEmail : onSignUpEmail}>
					<View style={{ width: "30%", alignItems: "flex-end" }}>
						<Image source={require("assets/email.png")} style={{ height: verticalScale(26), width: verticalScale(26) }} />
					</View>
					<InfoButtonText children={isRegisterLogIn ? "Log in with email" : "Sing up with email"} />
				</InfoButton>
				{/* <InfoButton onPress={isRegisterLogIn ? onHandleLoginWithGoogle : onHandleSingUpWithGoogle}>
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

			<TouchableOpacity onPress={isRegisterLogIn ? onRegisterSingUp : onRegisterLogIn}>
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
			</TouchableOpacity>
		</UserNotContainer>
	);
};

export const BottomInfo = (props: { user: IUser | undefined }) => {
	const { user } = props;
	const isLoggedIn = isDefined(user);

	return (
		<InfoContainer isLoggedIn={isLoggedIn}>
			<InfoTitle>Player Info</InfoTitle>
			{isLoggedIn ? <UserLoggedInfo user={user} /> : <UserNotLoggedInfo />}
			<TextLucky>
				Check <TextInfoBlue>www.website.com</TextInfoBlue> for more information!
			</TextLucky>
		</InfoContainer>
	);
};
