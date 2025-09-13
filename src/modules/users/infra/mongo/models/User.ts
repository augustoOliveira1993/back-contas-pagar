import mongoose, { Schema } from 'mongoose';
import { EStatusUser, IUserDocument } from '@modules/users/dto/IUserDTO';

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    permissaos: [{ type: Schema.Types.ObjectId, ref: 'Permissao' }],
    avatar_url: { type: String },
    setor: { type: String },
    pagina_inicial: { type: String },
    status: {
      type: String,
      enum: Object.values(EStatusUser),
      default: EStatusUser.ATIVO,
    },
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
    tempo_expiracao_token: { type: String, default: '8h' },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model<IUserDocument>('User', UserSchema);
