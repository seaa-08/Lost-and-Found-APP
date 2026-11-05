import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const LogoutNotice = ({ open, darkMode, onConfirm, onCancel }) => (
  <Dialog
    open={open}
    onClose={onCancel}
    slotProps={{
      paper: {
        sx: {
          borderRadius: 3,
          bgcolor: darkMode ? "#1b2937" : "#fff",
          color: darkMode ? "#e4edf6" : "#263d52",
        },
      },
    }}
  >
    <DialogTitle>Keluar dari akun?</DialogTitle>
    <DialogContent>
      <DialogContentText sx={{ color: darkMode ? "#b1c0cf" : "#60778c" }}>
        Anda tidak termasuk mahasiswa Mikroskil. Akun Anda akan dihapus
        setelah keluar.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} sx={{ color: "#8293a4" }}>
        Batal
      </Button>
      <Button onClick={onConfirm} sx={{ color: "#42a5f5" }}>
        Keluar
      </Button>
    </DialogActions>
  </Dialog>
);

export default LogoutNotice;