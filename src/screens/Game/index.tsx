import { useEffect, useState } from "react";
import { Animated, Dimensions, Image, type ImageSourcePropType } from "react-native";
import { ButtonsContainer, ControlsContainer, GameBackground, LifeContainer, ModeButton, ShapeButton, ShapeContainer } from "./styled";
import { moderateScale, verticalScale } from "@src/utils/scaleFunctions";
import styled from "styled-components/native";
import { fontSizes } from "@src/utils/constants";
import { TextObelix } from "@src/components/Text";

// Types
type ShapeType = "triangle" | "square" | "circle";
type ButtonMode = "red" | "blue";

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
	id: number;
	source: any;
	xPosition: number;
	translateY: Animated.Value;
	removedByPress?: boolean;
}

// Constants
const SHAPES: ShapeType[] = ["triangle", "square", "circle"];
const MODES: ButtonMode[] = ["blue", "red"];
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Initial game settings
const INITIAL_SETTINGS = {
	FREQUENCY: 2000,
	SPEED: 7000,
	MIN_FREQUENCY: 500,
	MIN_SPEED: 2000,
	SPEED_REDUCTION: 350,
	POINTS_PER_REDUCTION: 5,
};

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

const calculateGameSetting = (count: number, initialValue: number, minValue: number) => {
	const reduction = Math.floor(count / INITIAL_SETTINGS.POINTS_PER_REDUCTION) * INITIAL_SETTINGS.SPEED_REDUCTION;
	if (count >= 40) return minValue;
	if (count >= 50) return minValue + 200;
	if (count >= 70) return minValue + 500;
	if (count >= 90) return minValue + 300;
	if (count >= 110) return minValue + 500;
	return Math.max(initialValue - reduction, minValue);
};

const calculateGameSettingSpeed = (count: number, initialValue: number, minValue: number) => {
	const reduction = Math.floor(count / INITIAL_SETTINGS.POINTS_PER_REDUCTION) * INITIAL_SETTINGS.SPEED_REDUCTION;
	if (count >= 50) return minValue;
	if (count >= 70) return minValue - 200;
	if (count >= 90) return minValue - 500;
	if (count >= 110) return minValue - 800;
	return Math.max(initialValue - reduction, minValue);
};

// Reusable Components
const ShapeButtonComponent: React.FC<ShapeButtonProps> = ({ mode, shape, onPress }) => (
	<ShapeButton activeOpacity={1} onPress={() => onPress(shape)}>
		<Image resizeMode="stretch" style={{ height: verticalScale(60), width: verticalScale(60) }} source={SHAPE_IMAGES[mode][shape]} />
	</ShapeButton>
);

const ModeButtonComponent: React.FC<ModeButtonProps> = ({ mode, selected, onPress }) => (
	<ModeButton activeOpacity={1} onPress={onPress}>
		<Image
			resizeMode="stretch"
			style={{ height: verticalScale(46), width: verticalScale(70) }}
			source={selected ? MODE_BUTTON_IMAGES[mode].selected : MODE_BUTTON_IMAGES[mode].normal}
		/>
	</ModeButton>
);

const TextCounter = styled(TextObelix)`
  margin-bottom: 85%;
  font-size: ${verticalScale(fontSizes.XXXlarge) + 24}px;
  width: 100%;
  text-align: center;
  opacity: 0.8;
`;

export const Game: React.FC<GameProps> = ({ onClickMenu }) => {
	const [hits, setHits] = useState<number>(0);
	const [count, setCount] = useState<number>(0);
	const [frequency, setFrequency] = useState<number>(INITIAL_SETTINGS.FREQUENCY);
	const [speed, setSpeed] = useState<number>(INITIAL_SETTINGS.SPEED);
	const [symbols, setSymbols] = useState<DroppingSymbol[]>([]);
	const [currentMode, setCurrentMode] = useState<ButtonMode>("blue");

	const handleShapePress = (shape: ShapeType) => {
		const targetKey = `${currentMode}_${shape}`;
		const symbolToRemove = symbols.find((symbol) => Object.keys(symbol.source)[0] === targetKey);

		if (symbolToRemove) {
			setSymbols((prev) => prev.filter((symbol) => symbol.id !== symbolToRemove.id));
			setCount((prev) => prev + 1);
		}
	};

	const handleModeChange = (mode: ButtonMode) => {
		setCurrentMode(mode);
	};

	useEffect(() => {
		setFrequency(calculateGameSetting(count, INITIAL_SETTINGS.FREQUENCY, INITIAL_SETTINGS.MIN_FREQUENCY));
		setSpeed(calculateGameSettingSpeed(count, INITIAL_SETTINGS.SPEED, INITIAL_SETTINGS.MIN_SPEED));
	}, [count]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (hits < 3) {
				// 3 lives (0-3)
				addSymbol();
			}
		}, frequency);

		return () => clearInterval(interval);
	}, [hits, frequency]);

	const addSymbol = () => {
		const randomSymbol = SYMBOL_IMAGES[getRandomNumber(0, SYMBOL_IMAGES.length - 1)];
		const randomX = getRandomNumber(0, SCREEN_WIDTH - 50);

		const newSymbol: DroppingSymbol = {
			id: Date.now(),
			source: randomSymbol,
			xPosition: randomX,
			translateY: new Animated.Value(-250),
		};

		setSymbols((prev) => [...prev, newSymbol]);

		Animated.timing(newSymbol.translateY, {
			toValue: SCREEN_HEIGHT - SCREEN_HEIGHT * 0.2,
			duration: speed,
			useNativeDriver: false,
			easing: (val) => val,
		}).start(({ finished }) => {
			if (finished) {
				setHits((prev) => prev + 1);
			}
			setSymbols((prev) => prev.filter((symbol) => symbol.id !== newSymbol.id));
		});
	};

	console.log({ speed, frequency });

	return (
		<GameBackground>
			<TextCounter>{count}</TextCounter>

			<LifeContainer>
				{LIFE_IMAGES.slice(hits, 4).map((source, index) => (
					<Image key={index} style={{ height: verticalScale(10), width: "100%" }} source={source} />
				))}
			</LifeContainer>

			{symbols.map((symbol) => (
				<Animated.Image
					key={symbol.id}
					source={Object.values(symbol.source)[0] as number}
					style={{
						position: "absolute",
						width: 46,
						height: 48,
						top: 0,
						left: symbol.xPosition,
						transform: [{ translateY: symbol.translateY }],
					}}
					resizeMode="contain"
				/>
			))}

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
