import { useEffect, useState } from "react";
import { Animated, Dimensions, Image, type ImageSourcePropType } from "react-native";
import { ButtonsContainer, ControlsContainer, GameBackground, LifeContainer, ModeButton, ShapeButton, ShapeContainer } from "./styled";
import { moderateScale, verticalScale } from "@src/utils/scaleFunctions";

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

// Constants
const SHAPES: ShapeType[] = ["triangle", "square", "circle"];
const MODES: ButtonMode[] = ["blue", "red"];

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
			style={{ height: verticalScale(43), width: verticalScale(55) }}
			source={selected ? MODE_BUTTON_IMAGES[mode].selected : MODE_BUTTON_IMAGES[mode].normal}
		/>
	</ModeButton>
);

interface GameProps {
	onClickMenu: () => void;
}

const LIFE_IMAGES = [
	require("assets/controls/life0.png"),
	require("assets/controls/life1.png"),
	require("assets/controls/life2.png"),
	require("assets/controls/life3.png"),
];

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Constants
const SYMBOL_IMAGES = [
	{ blue_square: require("assets/controls/blue_square.png") },
	{ blue_circle: require("assets/controls/blue_circle.png") },
	{ blue_triangle: require("assets/controls/blue_triangle.png") },
	{ red_triangle: require("assets/controls/red_triangle.png") },
	{ red_square: require("assets/controls/red_square.png") },
	{ red_circle: require("assets/controls/red_circle.png") },
];

interface DroppingSymbol {
	id: number;
	source: any;
	xPosition: number;
	translateY: Animated.Value;
	removedByPress?: boolean;
}

const getRandomNumber = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const Game: React.FC<GameProps> = ({ onClickMenu }) => {
	const [hits, setHits] = useState<number>(0); // State to track the number of hits
	const [count, setCount] = useState<number>(0);
	const [symbols, setSymbols] = useState<DroppingSymbol[]>([]);
	const [currentMode, setCurrentMode] = useState<ButtonMode>("blue");

	const handleShapePress = (shape: ShapeType) => {
		const targetKey = `${currentMode}_${shape}`;
		const updatedSymbols = [...symbols];
		const indexToRemove = updatedSymbols.findIndex((symbol) => Object.keys(symbol.source)[0] === targetKey);

		if (indexToRemove !== -1) {
			updatedSymbols.splice(indexToRemove, 1);
			setSymbols(updatedSymbols);
			setCount((prev) => prev + 1);
			console.log(`Removed symbol: ${targetKey}`);
		} else {
			console.log(`No matching symbol found for: ${targetKey}`);
		}
	};

	const handleModeChange = (mode: ButtonMode) => {
		setCurrentMode(mode);
	};

	// Add a new symbol every 5 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			if (hits < 4) {
				addSymbol();
			}
		}, 2000);
		return () => clearInterval(interval); // Clear interval on component unmount
	}, [hits]);

	const addSymbol = () => {
		const randomNumber = getRandomNumber(0, SYMBOL_IMAGES.length - 1);
		const randomSymbol = SYMBOL_IMAGES[randomNumber];
		const randomX = Math.random() * (SCREEN_WIDTH - 50); // Random X position (50 is the symbol width)

		const newSymbol: DroppingSymbol = {
			id: Date.now(),
			source: randomSymbol,
			xPosition: randomX,
			translateY: new Animated.Value(0), // Start at the top of the screen
		};

		setSymbols((prev) => [...prev, newSymbol]);

		Animated.timing(newSymbol.translateY, {
			toValue: verticalScale(500), // Adjust this value to match the position of the "life" images
			duration: 9000,
			useNativeDriver: false,
			easing: (val) => val,
		}).start((res) => {
			// Remove the symbol when it reaches the bottom
			if (res.finished === true) {
				setHits((prev) => prev + 1);
			}
			setSymbols((prev) => prev.filter((symbol) => symbol.id !== newSymbol.id));
		});
	};

	console.log({ hits });

	return (
		<GameBackground>
			<LifeContainer>
				{LIFE_IMAGES.slice(hits, 4).map((source, index) => (
					<Image key={index} style={{ height: verticalScale(10), width: "100%" }} source={source} />
				))}
			</LifeContainer>

			{/* Dropping Symbols */}
			{symbols?.map((symbol) => (
				<Animated.Image
					key={symbol.id}
					source={Object.values(symbol.source)[0] as number}
					style={[
						{
							position: "absolute",
							width: 46, // Symbol width
							height: 48, // Symbol height
							top: 0, // Start at the top of the screen
						},
						{
							left: symbol.xPosition, // Random X position
							transform: [{ translateY: symbol.translateY }], // Falling animation
						},
					]}
					resizeMode="contain"
				/>
			))}

			<ButtonsContainer>
				{/* Shape Controls */}
				<ShapeContainer>
					{SHAPES.map((shape) => (
						<ShapeButtonComponent key={shape} mode={currentMode} shape={shape} onPress={handleShapePress} />
					))}
				</ShapeContainer>

				{/* Mode Selector */}
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
