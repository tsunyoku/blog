import { Stack, Typography } from "@mui/material";

interface LoadingProps {
    loadingText: string;
}

export default function Loading({ loadingText }: LoadingProps) {
    return <Stack direction="row" justifyContent="center" alignItems="center">
        <Typography variant="h2">{loadingText}</Typography>
    </Stack>
}