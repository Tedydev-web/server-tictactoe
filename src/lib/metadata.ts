// lib/metadata.ts
export const metadataConfig = {
    '/sign-in': {
      title: 'Đăng nhập tài khoản - FPT Polytechnic',
      description: 'Đăng nhập tài khoản để tiếp tục chơi trò chơi CARO.',
    },
    '/sign-up': {
      title: 'Đăng ký tài khoản - FPT Polytechnic',
      description: 'Tạo tài khoản mới và bắt đầu chơi trò chơi CARO.',
    }
  } satisfies Record<string, { title: string; description: string }>
  