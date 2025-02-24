import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const CredentialsSchema = z.object({
  code: z.string().nonempty(),
  state: z.string().optional(),
});

export class OauthVerifyCodeDto extends createZodDto(CredentialsSchema) {}
