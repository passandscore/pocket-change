import { useEffect, useState } from "react";
import { useInterval } from "@mantine/hooks";
import { createStyles, Button, Progress } from "@mantine/core";
import { LoadingState } from "@/data-schema/enums";
import { useViewportSize } from "@mantine/hooks";
import { BREAKPOINT } from "@/constants";

const useStyles = createStyles(() => ({
  button: {
    position: "relative",
    transition: "background-color 150ms ease",
  },

  progress: {
    position: "absolute",
    bottom: -1,
    right: -1,
    left: -1,
    top: -1,
    height: "auto",
    backgroundColor: "transparent",
    zIndex: 0,
  },

  label: {
    position: "relative",
    zIndex: 1,
  },
}));

export function SubmitButton({
  handleSubmit,
  setLoadingState,
  loadingState,
}: {
  handleSubmit: () => Promise<void>;
  setLoadingState: (arg0: LoadingState) => void;
  loadingState: LoadingState;
}) {
  const { classes, theme } = useStyles();
  const [progress, setProgress] = useState(0);
  const { width } = useViewportSize();

  const interval = useInterval(
    () =>
      setProgress((current) => {
        if (current < 100) {
          return current + 1;
        }

        interval.stop();
        setLoadingState(LoadingState.LOADED);
        return 0;
      }),
    20
  );

  useEffect(() => {
    if (loadingState === LoadingState.ERROR) {
      interval.stop();
      setProgress(0);
    }
  }, [loadingState]);

  return (
    <Button
      className={classes.button}
      onClick={() => {
        interval.start();
        handleSubmit();
      }}
      color={"teal"}
      style={{
        marginRight: `${width < BREAKPOINT && "5px"}`,
      }}
    >
      <div className={classes.label}>
        {progress !== 0
          ? "Emptying your pockets"
          : loadingState === LoadingState.LOADED
          ? "Pockets emptied"
          : "Empty your pockets"}
      </div>
      {progress !== 0 && (
        <Progress
          value={progress}
          className={classes.progress}
          color={theme.fn.rgba(theme.colors[theme.primaryColor][2], 0.35)}
          radius="sm"
        />
      )}
    </Button>
  );
}
