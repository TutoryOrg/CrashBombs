import { supabase } from "@src/utils/supabase";
import { Audio } from 'expo-av';
import { StatusBar } from "expo-status-bar";
import type { IUser } from "@src/utils/constants";
import { GameOverModal } from "@src/components/GameOverModal";
import { useEffect, useState } from "react";
import { moderateScale, scale, verticalScale } from "@src/utils/scaleFunctions";
import { Animated, Dimensions, Image, type ImageSourcePropType } from "react-native";
import {
	XButton,
	ModeButton,
	TextCounter,
	ShapeButton,
	TextTopScore,
	LifeContainer,
	ShapeContainer,
	GameBackground,
	ButtonsContainer,
	XButtonContainer,
	ControlsContainer,
} from "./styled";

// Types
type ButtonMode = "red" | "blue";
type ShapeType = "triangle" | "square" | "circle";

interface ShapeButtonProps {
	mode: ButtonMode;
	shape: ShapeType;
	onPress: (shape: ShapeType) => void;
}

interface ModeButtonProps {
	mode: ButtonMode;
	selected: boolean;
	onPress: () => void;
}

interface DroppingSymbol {
	id: string;
	source: any;
	xPosition: number;
	translateY: Animated.Value;
	animation?: Animated.CompositeAnimation;
}

// Constants
const SHAPES: ShapeType[] = ["triangle", "square", "circle"];
const MODES: ButtonMode[] = ["blue", "red"];
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");



const SHAPE_IMAGES: Record<ButtonMode, Record<ShapeType, ImageSourcePropType>> = {
	blue: {
		square: require("assets/controls/blue_square_selected.png"),
		circle: require("assets/controls/blue_circle_selected.png"),
		triangle: require("assets/controls/blue_triangle_selected.png"),
	},
	red: {
		square: require("assets/controls/red_square_selected.png"),
		circle: require("assets/controls/red_circle_selected.png"),
		triangle: require("assets/controls/red_triangle_selected.png"),
	},
};

const MODE_BUTTON_IMAGES: Record<ButtonMode, { normal: ImageSourcePropType; selected: ImageSourcePropType }> = {
	blue: {
		normal: require("assets/controls/btn_blue.png"),
		selected: require("assets/controls/btn_blue_selected.png"),
	},
	red: {
		normal: require("assets/controls/btn_red.png"),
		selected: require("assets/controls/btn_red_selected.png"),
	},
};

const SYMBOL_IMAGES = [
	{ blue_square: require("assets/controls/blue_square.png") },
	{ blue_circle: require("assets/controls/blue_circle.png") },
	{ blue_triangle: require("assets/controls/blue_triangle.png") },
	{ red_triangle: require("assets/controls/red_triangle.png") },
	{ red_square: require("assets/controls/red_square.png") },
	{ red_circle: require("assets/controls/red_circle.png") },
];

const LIFE_IMAGES = [
	require("assets/controls/life_0.png"),
	require("assets/controls/life_1.png"),
	require("assets/controls/life_2.png"),
	require("assets/controls/life_3.png"),
];

// Helper functions
const getRandomNumber = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Initial game settings
const INITIAL_SETTINGS = {
	FREQUENCY: 2000,       // Initial time between obstacles (ms)
	SPEED: 5000,          // Initial obstacle movement speed
	MIN_FREQUENCY: 400,   // Minimum time between obstacles
	MIN_SPEED: 2000,      // Minimum obstacle speed
	SPEED_REDUCTION: 100, // Speed reduction per step
	POINTS_PER_REDUCTION: 3, // Points needed for each difficulty increase
};

const calculateFrecuency = (count: number, initialValue: number, minValue: number) => {
	const reduction = (count / INITIAL_SETTINGS.POINTS_PER_REDUCTION) * 40;

	// Progressive difficulty stages
	// if (count >= 30 && count < 60) return minValue + 300;
	// if (count >= 60 && count < 90) return minValue + 200;
	// if (count >= 90 && count < 120) return minValue + 100;
	// if (count >= 120 && count < 180) return minValue;
	// if (count >= 180 && count < 240) return minValue - 100;
	// if (count >= 240) return minValue - 150;

	return Math.max(initialValue - reduction, minValue);
};

const calculateGameSettingSpeed = (count: number, initialValue: number, minValue: number) => {
	const reduction = (count / INITIAL_SETTINGS.POINTS_PER_REDUCTION) * 120;

	// Progressive difficulty stages
	// if (count >= 30 && count < 60) return minValue + 500;
	// if (count >= 60 && count < 90) return minValue + 300;
	// if (count >= 90 && count < 120) return minValue;
	// if (count >= 120 && count < 180) return minValue - 300;
	// if (count >= 180 && count < 240) return minValue - 600;
	// if (count >= 240) return minValue - 800;

	return Math.max(initialValue - reduction, minValue);
};

// Reusable Components
const ShapeButtonComponent: React.FC<ShapeButtonProps> = ({ mode, shape, onPress }) => (
	<ShapeButton activeOpacity={1} onPress={() => onPress(shape)}>
		<Image resizeMode="stretch" style={{ height: scale(55), width: scale(55) }} source={SHAPE_IMAGES[mode][shape]} />
	</ShapeButton>
);

const ModeButtonComponent: React.FC<ModeButtonProps> = ({ mode, selected, onPress }) => {
	return (
		<ModeButton mode={mode} selected={selected} onPress={onPress}>
			<Image
				resizeMode="stretch"
				style={{ height: verticalScale(46), width: verticalScale(70) }}
			// source={selected ? MODE_BUTTON_IMAGES[mode].selected : MODE_BUTTON_IMAGES[mode].normal}
			/>
		</ModeButton>
	);
};

interface GameProps {
	user: IUser | undefined;
	onClickMenu: () => void;
	fetchProfile: (id: string) => void;
}

export const Game: React.FC<GameProps> = ({ user, onClickMenu, fetchProfile }) => {
	const [hits, setHits] = useState<number>(0);
	const [count, setCount] = useState<number>(0);
	const [speed, setSpeed] = useState<number>(INITIAL_SETTINGS.SPEED);
	const [paused, setPaused] = useState(false);
	const [symbols, setSymbols] = useState<DroppingSymbol[]>([]);
	const [gameOver, setGameOver] = useState(false);
	const [frequency, setFrequency] = useState<number>(INITIAL_SETTINGS.FREQUENCY);
	const [currentMode, setCurrentMode] = useState<ButtonMode>("blue");

	const [soundSucces, setSoundSucces] = useState<Audio.Sound>();
	const [soundMissed, setSoundMissed] = useState<Audio.Sound>();

	const handleModeChange = (mode: ButtonMode) => setCurrentMode(mode);

	const handleShapePress = async (shape: ShapeType) => {
		const targetKey = `${currentMode}_${shape}`;
		const symbolToRemove = symbols.find((symbol) => Object.keys(symbol.source)[0] === targetKey);

		if (symbolToRemove) {
			setSymbols((prev) => prev.filter((symbol) => symbol.id !== symbolToRemove.id));
			setCount((prev) => prev + 1);
			try {
				if (soundSucces) {
					await soundSucces.replayAsync();
				}
			} catch (error) {
				console.error('Error playing sound:', error);
			}
		} else {
			try {
				if (soundMissed) {
					await soundMissed.replayAsync();
				}
			} catch (error) {
				console.error('Error playing sound:', error);
			}
		}


	};

	useEffect(() => {
		setFrequency(calculateFrecuency(count, INITIAL_SETTINGS.FREQUENCY, INITIAL_SETTINGS.MIN_FREQUENCY));
		setSpeed(calculateGameSettingSpeed(count, INITIAL_SETTINGS.SPEED, INITIAL_SETTINGS.MIN_SPEED));
	}, [count]);

	useEffect(() => {
		const loadSound = async () => {
			const { sound } = await Audio.Sound.createAsync(
				require('assets/sounds/sound_1.mp3')
			);
			setSoundSucces(sound);

			const { sound: soundMissed } = await Audio.Sound.createAsync(
				require('assets/sounds/sound_2.mp3')
			);
			setSoundMissed(soundMissed);

		};

		loadSound();

		return () => {
			if (soundSucces) {
				soundSucces.unloadAsync();
			}
			if (soundMissed) {
				soundMissed.unloadAsync();
			}
		};
	}, []);

	useEffect(() => {
		if (paused === true) return;
		const interval = setInterval(() => {
			if (hits <= 3) addSymbol();
			else setGameOver(true);
		}, frequency);

		return () => clearInterval(interval);
	}, [hits, frequency, paused]);

	useEffect(() => {
		if (gameOver === true && hits >= 3 && user?.bestscore !== undefined && Number(user.bestscore) < count) {
			const updateBestScore = async () => {
				try {
					const { data, error, status } = await supabase
						.from("profiles")
						.update({ bestscore: count })
						.eq("id", user?.id)
						.select();

					console.log({ data });

					if (data) {
						fetchProfile(user?.id);
					}

					if (error && status !== 406) {
						throw error;
					}
					console.log("Best score updated successfully");
				} catch (error) {
					console.error("Error updating best score:", error);
				}
			};
			updateBestScore();
		}
	}, [gameOver]);

	const addSymbol = () => {
		if (paused === true) return;

		const randomSymbol = SYMBOL_IMAGES[getRandomNumber(0, SYMBOL_IMAGES.length - 1)];
		const randomX = getRandomNumber(0, SCREEN_WIDTH - 50);

		const newSymbol: DroppingSymbol = {
			id: new Date().getTime().toString(),
			source: randomSymbol,
			xPosition: randomX,
			translateY: new Animated.Value(-100),
		};

		setSymbols((prev) => [...prev, newSymbol]);

		const animation = Animated.timing(newSymbol.translateY, {
			toValue: SCREEN_HEIGHT - SCREEN_HEIGHT * 0.2,
			duration: speed,
			useNativeDriver: true,
			easing: (val) => val,
		});

		animation.start(({ finished }) => {
			if (finished === true) {
				setHits((prev) => prev + 1);
			}
			setSymbols((prev) => prev.filter((symbol) => symbol.id !== newSymbol.id));
		});
	};

	const handleRestart = () => {
		setHits(0);
		setCount(0);
		setSymbols([]);
		setPaused(false);
		setGameOver(false);
		setSpeed(INITIAL_SETTINGS.SPEED);
		setFrequency(INITIAL_SETTINGS.FREQUENCY);
	};

	const handleResume = () => {
		setPaused(false);
		setGameOver(false);
	};

	const handlePause = () => {
		setPaused(true);
		setGameOver(true);
	};

	return (
		<GameBackground>
			<StatusBar hidden={true} backgroundColor={"white"} translucent={false} />
			<GameOverModal hits={hits} gameOver={gameOver} onRestart={handleRestart} onResume={handleResume} onMenu={onClickMenu} />

			{/* <XButtonContainer onPress={() => handlePause()}>
				<XButton>X</XButton>
			</XButtonContainer> */}

			<TextTopScore>Best Score: {user?.bestscore || "_"}</TextTopScore>

			<TextCounter>{count}</TextCounter>

			<LifeContainer>
				{LIFE_IMAGES.slice(hits, 4).map((source, index) => (
					<Image key={index} style={{ height: verticalScale(10), width: "100%" }} source={source} />
				))}
			</LifeContainer>

			{paused === false &&
				symbols.map((symbol) => {
					return (
						<Animated.Image
							key={symbol.id}
							source={Object.values(symbol.source)[0] as number}
							style={{
								top: 0,
								width: moderateScale(46),
								height: moderateScale(48),
								position: "absolute",
								left: symbol.xPosition,
								transform: [{ translateY: symbol.translateY }],
							}}
							resizeMode="contain"
						/>
					);
				})}

			<ButtonsContainer>
				<ShapeContainer>
					{SHAPES.map((shape) => (
						<ShapeButtonComponent key={shape} mode={currentMode} shape={shape} onPress={handleShapePress} />
					))}
				</ShapeContainer>

				<ControlsContainer>
					{MODES.map((mode) => (
						<ModeButtonComponent
							key={mode}
							mode={mode}
							selected={currentMode === mode}
							onPress={() => handleModeChange(mode)}
						/>
					))}
				</ControlsContainer>
			</ButtonsContainer>
		</GameBackground>
	);
};
