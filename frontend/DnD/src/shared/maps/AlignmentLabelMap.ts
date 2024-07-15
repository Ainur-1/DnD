import { CharacterAlignmentType } from "../api/gql/graphql";

export const labelMap: Map<CharacterAlignmentType, string>
= new Map([
    [CharacterAlignmentType.ChaoticEvil, "Хаотично-злой"],
    [CharacterAlignmentType.ChaoticGood, "Хаотично-добрый"],
    [CharacterAlignmentType.ChaoticNeutral, "Хаотичный"],
    [CharacterAlignmentType.LawfulEvil, "Упорядоченно-злой"],
    [CharacterAlignmentType.LawfulGood, "Упорядоченно-добрый"],
    [CharacterAlignmentType.LawfulNeutral, "Упорядоченный"],
    [CharacterAlignmentType.NeutralEvil, "Злой"],
    [CharacterAlignmentType.NeutralGood, "Добрый"],
    [CharacterAlignmentType.TrueNeutral, "Истинно нейтральный"],
    [CharacterAlignmentType.Unaligned, "Без привязки"],
    [CharacterAlignmentType.Any, "Любое"],
]);