import { Image } from "react-native";
import { useState } from "react";
import { verticalScale } from "@src/utils/scaleFunctions";
import { HeaderStyled, SafeAreaStyled, TextUser, TitleStyled, UserLoggedIn } from "./styled";

export const Header = () => {
	const [isUser, setIsUser] = useState(false);

	return (
		<HeaderStyled isUser={isUser}>
			<UserLoggedIn isUser={isUser}>
				<TextUser>#201</TextUser>
				<TextUser>user_001</TextUser>
			</UserLoggedIn>
			<Image
				source={isUser ? require("assets/loguser.png") : require("assets/user.png")}
				style={{ width: verticalScale(20), height: verticalScale(20) }}
			/>
		</HeaderStyled>
	);
};

export const Home = () => {
	return (
		<SafeAreaStyled>
			<Header />
			<TitleStyled>CRASH BOMBS</TitleStyled>
		</SafeAreaStyled>
	);
};
