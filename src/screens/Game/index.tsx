import { useState } from "react";
import { Image, type ImageSourcePropType } from "react-native";
import { ButtonsContainer, ControlsContainer, GameBackground, ModeButton, ShapeButton, ShapeContainer } from "./styled";

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
		<Image source={SHAPE_IMAGES[mode][shape]} />
	</ShapeButton>
);

const ModeButtonComponent: React.FC<ModeButtonProps> = ({ mode, selected, onPress }) => (
	<ModeButton activeOpacity={1} onPress={onPress}>
		<Image source={selected ? MODE_BUTTON_IMAGES[mode].selected : MODE_BUTTON_IMAGES[mode].normal} />
	</ModeButton>
);

interface GameProps {
	onClickMenu: () => void;
}

export const Game: React.FC<GameProps> = ({ onClickMenu }) => {
	const [currentMode, setCurrentMode] = useState<ButtonMode>("blue");

	const handleShapePress = (shape: ShapeType) => {
		console.log(`click_${currentMode}_${shape}`);
	};

	const handleModeChange = (mode: ButtonMode) => {
		setCurrentMode(mode);
	};

	return (
		<GameBackground>
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
