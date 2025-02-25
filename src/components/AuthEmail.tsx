import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Input } from "@rneui/themed";
import { supabase } from "@src/utils/supabase";
import { REGISTER } from "@src/utils/constants";
import _ from "lodash";

export const AuthEmail = (props: { register: REGISTER }) => {
	const { register } = props;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	async function signInWithEmail() {
		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		if (error) Alert.alert(error.message);
		setLoading(false);
	}

	async function signUpWithEmail() {
		setLoading(true);
		const {
			data: { session },
			error,
		} = await supabase.auth.signUp({
			email: email,
			password: password,
		});

		if (error) Alert.alert(error.message);
		if (!session) Alert.alert("Please check your inbox for email verification!");
		setLoading(false);
	}

	return (
		<View style={styles.container}>
			<View style={{}}>
				<Input
					label="Email"
					leftIcon={{ type: "font-awesome", name: "envelope" }}
					onChangeText={(text) => setEmail(text)}
					value={email}
					placeholder="email@address.com"
					autoCapitalize={"none"}
					inputStyle={{ color: "white" }}
				/>
			</View>
			<View style={{}}>
				<Input
					label="Password"
					leftIcon={{ type: "font-awesome", name: "lock" }}
					onChangeText={(text) => setPassword(text)}
					value={password}
					secureTextEntry={true}
					placeholder="Password"
					autoCapitalize={"none"}
					inputStyle={{ color: "white" }}
				/>
			</View>
			{_.isEqual(register, REGISTER.SING_UP) ? (
				<View style={{}}>
					<Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
				</View>
			) : (
				<View style={{}}>
					<Button title="Log in" disabled={loading} onPress={() => signInWithEmail()} />
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 12,
		width: "100%",
	},
});
