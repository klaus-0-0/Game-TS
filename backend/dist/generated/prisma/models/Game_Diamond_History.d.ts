import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model Game_Diamond_History
 *
 */
export type Game_Diamond_HistoryModel = runtime.Types.Result.DefaultSelection<Prisma.$Game_Diamond_HistoryPayload>;
export type AggregateGame_Diamond_History = {
    _count: Game_Diamond_HistoryCountAggregateOutputType | null;
    _avg: Game_Diamond_HistoryAvgAggregateOutputType | null;
    _sum: Game_Diamond_HistorySumAggregateOutputType | null;
    _min: Game_Diamond_HistoryMinAggregateOutputType | null;
    _max: Game_Diamond_HistoryMaxAggregateOutputType | null;
};
export type Game_Diamond_HistoryAvgAggregateOutputType = {
    mines: number | null;
    minesCount: number | null;
    stake: number | null;
    clickedTiles: number | null;
    balance: number | null;
    potentialWin: number | null;
    winAmount: number | null;
};
export type Game_Diamond_HistorySumAggregateOutputType = {
    mines: number[];
    minesCount: number | null;
    stake: number | null;
    clickedTiles: number[];
    balance: number | null;
    potentialWin: number | null;
    winAmount: number | null;
};
export type Game_Diamond_HistoryMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    gameId: string | null;
    minesCount: number | null;
    stake: number | null;
    status: $Enums.GameStatus | null;
    balance: number | null;
    potentialWin: number | null;
    winAmount: number | null;
    createdAt: Date | null;
};
export type Game_Diamond_HistoryMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    gameId: string | null;
    minesCount: number | null;
    stake: number | null;
    status: $Enums.GameStatus | null;
    balance: number | null;
    potentialWin: number | null;
    winAmount: number | null;
    createdAt: Date | null;
};
export type Game_Diamond_HistoryCountAggregateOutputType = {
    id: number;
    userId: number;
    gameId: number;
    mines: number;
    minesCount: number;
    stake: number;
    clickedTiles: number;
    status: number;
    balance: number;
    potentialWin: number;
    winAmount: number;
    createdAt: number;
    _all: number;
};
export type Game_Diamond_HistoryAvgAggregateInputType = {
    mines?: true;
    minesCount?: true;
    stake?: true;
    clickedTiles?: true;
    balance?: true;
    potentialWin?: true;
    winAmount?: true;
};
export type Game_Diamond_HistorySumAggregateInputType = {
    mines?: true;
    minesCount?: true;
    stake?: true;
    clickedTiles?: true;
    balance?: true;
    potentialWin?: true;
    winAmount?: true;
};
export type Game_Diamond_HistoryMinAggregateInputType = {
    id?: true;
    userId?: true;
    gameId?: true;
    minesCount?: true;
    stake?: true;
    status?: true;
    balance?: true;
    potentialWin?: true;
    winAmount?: true;
    createdAt?: true;
};
export type Game_Diamond_HistoryMaxAggregateInputType = {
    id?: true;
    userId?: true;
    gameId?: true;
    minesCount?: true;
    stake?: true;
    status?: true;
    balance?: true;
    potentialWin?: true;
    winAmount?: true;
    createdAt?: true;
};
export type Game_Diamond_HistoryCountAggregateInputType = {
    id?: true;
    userId?: true;
    gameId?: true;
    mines?: true;
    minesCount?: true;
    stake?: true;
    clickedTiles?: true;
    status?: true;
    balance?: true;
    potentialWin?: true;
    winAmount?: true;
    createdAt?: true;
    _all?: true;
};
export type Game_Diamond_HistoryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Game_Diamond_History to aggregate.
     */
    where?: Prisma.Game_Diamond_HistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Game_Diamond_Histories to fetch.
     */
    orderBy?: Prisma.Game_Diamond_HistoryOrderByWithRelationInput | Prisma.Game_Diamond_HistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.Game_Diamond_HistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Game_Diamond_Histories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Game_Diamond_Histories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Game_Diamond_Histories
    **/
    _count?: true | Game_Diamond_HistoryCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: Game_Diamond_HistoryAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: Game_Diamond_HistorySumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: Game_Diamond_HistoryMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: Game_Diamond_HistoryMaxAggregateInputType;
};
export type GetGame_Diamond_HistoryAggregateType<T extends Game_Diamond_HistoryAggregateArgs> = {
    [P in keyof T & keyof AggregateGame_Diamond_History]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateGame_Diamond_History[P]> : Prisma.GetScalarType<T[P], AggregateGame_Diamond_History[P]>;
};
export type Game_Diamond_HistoryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.Game_Diamond_HistoryWhereInput;
    orderBy?: Prisma.Game_Diamond_HistoryOrderByWithAggregationInput | Prisma.Game_Diamond_HistoryOrderByWithAggregationInput[];
    by: Prisma.Game_Diamond_HistoryScalarFieldEnum[] | Prisma.Game_Diamond_HistoryScalarFieldEnum;
    having?: Prisma.Game_Diamond_HistoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Game_Diamond_HistoryCountAggregateInputType | true;
    _avg?: Game_Diamond_HistoryAvgAggregateInputType;
    _sum?: Game_Diamond_HistorySumAggregateInputType;
    _min?: Game_Diamond_HistoryMinAggregateInputType;
    _max?: Game_Diamond_HistoryMaxAggregateInputType;
};
export type Game_Diamond_HistoryGroupByOutputType = {
    id: string;
    userId: string;
    gameId: string;
    mines: number[];
    minesCount: number;
    stake: number;
    clickedTiles: number[];
    status: $Enums.GameStatus;
    balance: number;
    potentialWin: number;
    winAmount: number;
    createdAt: Date;
    _count: Game_Diamond_HistoryCountAggregateOutputType | null;
    _avg: Game_Diamond_HistoryAvgAggregateOutputType | null;
    _sum: Game_Diamond_HistorySumAggregateOutputType | null;
    _min: Game_Diamond_HistoryMinAggregateOutputType | null;
    _max: Game_Diamond_HistoryMaxAggregateOutputType | null;
};
type GetGame_Diamond_HistoryGroupByPayload<T extends Game_Diamond_HistoryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Game_Diamond_HistoryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Game_Diamond_HistoryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Game_Diamond_HistoryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Game_Diamond_HistoryGroupByOutputType[P]>;
}>>;
export type Game_Diamond_HistoryWhereInput = {
    AND?: Prisma.Game_Diamond_HistoryWhereInput | Prisma.Game_Diamond_HistoryWhereInput[];
    OR?: Prisma.Game_Diamond_HistoryWhereInput[];
    NOT?: Prisma.Game_Diamond_HistoryWhereInput | Prisma.Game_Diamond_HistoryWhereInput[];
    id?: Prisma.StringFilter<"Game_Diamond_History"> | string;
    userId?: Prisma.StringFilter<"Game_Diamond_History"> | string;
    gameId?: Prisma.StringFilter<"Game_Diamond_History"> | string;
    mines?: Prisma.IntNullableListFilter<"Game_Diamond_History">;
    minesCount?: Prisma.IntFilter<"Game_Diamond_History"> | number;
    stake?: Prisma.FloatFilter<"Game_Diamond_History"> | number;
    clickedTiles?: Prisma.IntNullableListFilter<"Game_Diamond_History">;
    status?: Prisma.EnumGameStatusFilter<"Game_Diamond_History"> | $Enums.GameStatus;
    balance?: Prisma.FloatFilter<"Game_Diamond_History"> | number;
    potentialWin?: Prisma.FloatFilter<"Game_Diamond_History"> | number;
    winAmount?: Prisma.FloatFilter<"Game_Diamond_History"> | number;
    createdAt?: Prisma.DateTimeFilter<"Game_Diamond_History"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type Game_Diamond_HistoryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    gameId?: Prisma.SortOrder;
    mines?: Prisma.SortOrder;
    minesCount?: Prisma.SortOrder;
    stake?: Prisma.SortOrder;
    clickedTiles?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    potentialWin?: Prisma.SortOrder;
    winAmount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type Game_Diamond_HistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    gameId?: string;
    AND?: Prisma.Game_Diamond_HistoryWhereInput | Prisma.Game_Diamond_HistoryWhereInput[];
    OR?: Prisma.Game_Diamond_HistoryWhereInput[];
    NOT?: Prisma.Game_Diamond_HistoryWhereInput | Prisma.Game_Diamond_HistoryWhereInput[];
    userId?: Prisma.StringFilter<"Game_Diamond_History"> | string;
    mines?: Prisma.IntNullableListFilter<"Game_Diamond_History">;
    minesCount?: Prisma.IntFilter<"Game_Diamond_History"> | number;
    stake?: Prisma.FloatFilter<"Game_Diamond_History"> | number;
    clickedTiles?: Prisma.IntNullableListFilter<"Game_Diamond_History">;
    status?: Prisma.EnumGameStatusFilter<"Game_Diamond_History"> | $Enums.GameStatus;
    balance?: Prisma.FloatFilter<"Game_Diamond_History"> | number;
    potentialWin?: Prisma.FloatFilter<"Game_Diamond_History"> | number;
    winAmount?: Prisma.FloatFilter<"Game_Diamond_History"> | number;
    createdAt?: Prisma.DateTimeFilter<"Game_Diamond_History"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "gameId">;
export type Game_Diamond_HistoryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    gameId?: Prisma.SortOrder;
    mines?: Prisma.SortOrder;
    minesCount?: Prisma.SortOrder;
    stake?: Prisma.SortOrder;
    clickedTiles?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    potentialWin?: Prisma.SortOrder;
    winAmount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.Game_Diamond_HistoryCountOrderByAggregateInput;
    _avg?: Prisma.Game_Diamond_HistoryAvgOrderByAggregateInput;
    _max?: Prisma.Game_Diamond_HistoryMaxOrderByAggregateInput;
    _min?: Prisma.Game_Diamond_HistoryMinOrderByAggregateInput;
    _sum?: Prisma.Game_Diamond_HistorySumOrderByAggregateInput;
};
export type Game_Diamond_HistoryScalarWhereWithAggregatesInput = {
    AND?: Prisma.Game_Diamond_HistoryScalarWhereWithAggregatesInput | Prisma.Game_Diamond_HistoryScalarWhereWithAggregatesInput[];
    OR?: Prisma.Game_Diamond_HistoryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.Game_Diamond_HistoryScalarWhereWithAggregatesInput | Prisma.Game_Diamond_HistoryScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Game_Diamond_History"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"Game_Diamond_History"> | string;
    gameId?: Prisma.StringWithAggregatesFilter<"Game_Diamond_History"> | string;
    mines?: Prisma.IntNullableListFilter<"Game_Diamond_History">;
    minesCount?: Prisma.IntWithAggregatesFilter<"Game_Diamond_History"> | number;
    stake?: Prisma.FloatWithAggregatesFilter<"Game_Diamond_History"> | number;
    clickedTiles?: Prisma.IntNullableListFilter<"Game_Diamond_History">;
    status?: Prisma.EnumGameStatusWithAggregatesFilter<"Game_Diamond_History"> | $Enums.GameStatus;
    balance?: Prisma.FloatWithAggregatesFilter<"Game_Diamond_History"> | number;
    potentialWin?: Prisma.FloatWithAggregatesFilter<"Game_Diamond_History"> | number;
    winAmount?: Prisma.FloatWithAggregatesFilter<"Game_Diamond_History"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Game_Diamond_History"> | Date | string;
};
export type Game_Diamond_HistoryCreateInput = {
    id?: string;
    gameId: string;
    mines?: Prisma.Game_Diamond_HistoryCreateminesInput | number[];
    minesCount: number;
    stake: number;
    clickedTiles?: Prisma.Game_Diamond_HistoryCreateclickedTilesInput | number[];
    status: $Enums.GameStatus;
    balance: number;
    potentialWin: number;
    winAmount?: number;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutDiamondGamesInput;
};
export type Game_Diamond_HistoryUncheckedCreateInput = {
    id?: string;
    userId: string;
    gameId: string;
    mines?: Prisma.Game_Diamond_HistoryCreateminesInput | number[];
    minesCount: number;
    stake: number;
    clickedTiles?: Prisma.Game_Diamond_HistoryCreateclickedTilesInput | number[];
    status: $Enums.GameStatus;
    balance: number;
    potentialWin: number;
    winAmount?: number;
    createdAt?: Date | string;
};
export type Game_Diamond_HistoryUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    gameId?: Prisma.StringFieldUpdateOperationsInput | string;
    mines?: Prisma.Game_Diamond_HistoryUpdateminesInput | number[];
    minesCount?: Prisma.IntFieldUpdateOperationsInput | number;
    stake?: Prisma.FloatFieldUpdateOperationsInput | number;
    clickedTiles?: Prisma.Game_Diamond_HistoryUpdateclickedTilesInput | number[];
    status?: Prisma.EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus;
    balance?: Prisma.FloatFieldUpdateOperationsInput | number;
    potentialWin?: Prisma.FloatFieldUpdateOperationsInput | number;
    winAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutDiamondGamesNestedInput;
};
export type Game_Diamond_HistoryUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    gameId?: Prisma.StringFieldUpdateOperationsInput | string;
    mines?: Prisma.Game_Diamond_HistoryUpdateminesInput | number[];
    minesCount?: Prisma.IntFieldUpdateOperationsInput | number;
    stake?: Prisma.FloatFieldUpdateOperationsInput | number;
    clickedTiles?: Prisma.Game_Diamond_HistoryUpdateclickedTilesInput | number[];
    status?: Prisma.EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus;
    balance?: Prisma.FloatFieldUpdateOperationsInput | number;
    potentialWin?: Prisma.FloatFieldUpdateOperationsInput | number;
    winAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type Game_Diamond_HistoryCreateManyInput = {
    id?: string;
    userId: string;
    gameId: string;
    mines?: Prisma.Game_Diamond_HistoryCreateminesInput | number[];
    minesCount: number;
    stake: number;
    clickedTiles?: Prisma.Game_Diamond_HistoryCreateclickedTilesInput | number[];
    status: $Enums.GameStatus;
    balance: number;
    potentialWin: number;
    winAmount?: number;
    createdAt?: Date | string;
};
export type Game_Diamond_HistoryUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    gameId?: Prisma.StringFieldUpdateOperationsInput | string;
    mines?: Prisma.Game_Diamond_HistoryUpdateminesInput | number[];
    minesCount?: Prisma.IntFieldUpdateOperationsInput | number;
    stake?: Prisma.FloatFieldUpdateOperationsInput | number;
    clickedTiles?: Prisma.Game_Diamond_HistoryUpdateclickedTilesInput | number[];
    status?: Prisma.EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus;
    balance?: Prisma.FloatFieldUpdateOperationsInput | number;
    potentialWin?: Prisma.FloatFieldUpdateOperationsInput | number;
    winAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type Game_Diamond_HistoryUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    gameId?: Prisma.StringFieldUpdateOperationsInput | string;
    mines?: Prisma.Game_Diamond_HistoryUpdateminesInput | number[];
    minesCount?: Prisma.IntFieldUpdateOperationsInput | number;
    stake?: Prisma.FloatFieldUpdateOperationsInput | number;
    clickedTiles?: Prisma.Game_Diamond_HistoryUpdateclickedTilesInput | number[];
    status?: Prisma.EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus;
    balance?: Prisma.FloatFieldUpdateOperationsInput | number;
    potentialWin?: Prisma.FloatFieldUpdateOperationsInput | number;
    winAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type Game_Diamond_HistoryListRelationFilter = {
    every?: Prisma.Game_Diamond_HistoryWhereInput;
    some?: Prisma.Game_Diamond_HistoryWhereInput;
    none?: Prisma.Game_Diamond_HistoryWhereInput;
};
export type Game_Diamond_HistoryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type IntNullableListFilter<$PrismaModel = never> = {
    equals?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    has?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    hasEvery?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    hasSome?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type Game_Diamond_HistoryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    gameId?: Prisma.SortOrder;
    mines?: Prisma.SortOrder;
    minesCount?: Prisma.SortOrder;
    stake?: Prisma.SortOrder;
    clickedTiles?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    potentialWin?: Prisma.SortOrder;
    winAmount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type Game_Diamond_HistoryAvgOrderByAggregateInput = {
    mines?: Prisma.SortOrder;
    minesCount?: Prisma.SortOrder;
    stake?: Prisma.SortOrder;
    clickedTiles?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    potentialWin?: Prisma.SortOrder;
    winAmount?: Prisma.SortOrder;
};
export type Game_Diamond_HistoryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    gameId?: Prisma.SortOrder;
    minesCount?: Prisma.SortOrder;
    stake?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    potentialWin?: Prisma.SortOrder;
    winAmount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type Game_Diamond_HistoryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    gameId?: Prisma.SortOrder;
    minesCount?: Prisma.SortOrder;
    stake?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    potentialWin?: Prisma.SortOrder;
    winAmount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type Game_Diamond_HistorySumOrderByAggregateInput = {
    mines?: Prisma.SortOrder;
    minesCount?: Prisma.SortOrder;
    stake?: Prisma.SortOrder;
    clickedTiles?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    potentialWin?: Prisma.SortOrder;
    winAmount?: Prisma.SortOrder;
};
export type Game_Diamond_HistoryCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.Game_Diamond_HistoryCreateWithoutUserInput, Prisma.Game_Diamond_HistoryUncheckedCreateWithoutUserInput> | Prisma.Game_Diamond_HistoryCreateWithoutUserInput[] | Prisma.Game_Diamond_HistoryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.Game_Diamond_HistoryCreateOrConnectWithoutUserInput | Prisma.Game_Diamond_HistoryCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.Game_Diamond_HistoryCreateManyUserInputEnvelope;
    connect?: Prisma.Game_Diamond_HistoryWhereUniqueInput | Prisma.Game_Diamond_HistoryWhereUniqueInput[];
};
export type Game_Diamond_HistoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.Game_Diamond_HistoryCreateWithoutUserInput, Prisma.Game_Diamond_HistoryUncheckedCreateWithoutUserInput> | Prisma.Game_Diamond_HistoryCreateWithoutUserInput[] | Prisma.Game_Diamond_HistoryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.Game_Diamond_HistoryCreateOrConnectWithoutUserInput | Prisma.Game_Diamond_HistoryCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.Game_Diamond_HistoryCreateManyUserInputEnvelope;
    connect?: Prisma.Game_Diamond_HistoryWhereUniqueInput | Prisma.Game_Diamond_HistoryWhereUniqueInput[];
};
export type Game_Diamond_HistoryUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.Game_Diamond_HistoryCreateWithoutUserInput, Prisma.Game_Diamond_HistoryUncheckedCreateWithoutUserInput> | Prisma.Game_Diamond_HistoryCreateWithoutUserInput[] | Prisma.Game_Diamond_HistoryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.Game_Diamond_HistoryCreateOrConnectWithoutUserInput | Prisma.Game_Diamond_HistoryCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.Game_Diamond_HistoryUpsertWithWhereUniqueWithoutUserInput | Prisma.Game_Diamond_HistoryUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.Game_Diamond_HistoryCreateManyUserInputEnvelope;
    set?: Prisma.Game_Diamond_HistoryWhereUniqueInput | Prisma.Game_Diamond_HistoryWhereUniqueInput[];
    disconnect?: Prisma.Game_Diamond_HistoryWhereUniqueInput | Prisma.Game_Diamond_HistoryWhereUniqueInput[];
    delete?: Prisma.Game_Diamond_HistoryWhereUniqueInput | Prisma.Game_Diamond_HistoryWhereUniqueInput[];
    connect?: Prisma.Game_Diamond_HistoryWhereUniqueInput | Prisma.Game_Diamond_HistoryWhereUniqueInput[];
    update?: Prisma.Game_Diamond_HistoryUpdateWithWhereUniqueWithoutUserInput | Prisma.Game_Diamond_HistoryUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.Game_Diamond_HistoryUpdateManyWithWhereWithoutUserInput | Prisma.Game_Diamond_HistoryUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.Game_Diamond_HistoryScalarWhereInput | Prisma.Game_Diamond_HistoryScalarWhereInput[];
};
export type Game_Diamond_HistoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.Game_Diamond_HistoryCreateWithoutUserInput, Prisma.Game_Diamond_HistoryUncheckedCreateWithoutUserInput> | Prisma.Game_Diamond_HistoryCreateWithoutUserInput[] | Prisma.Game_Diamond_HistoryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.Game_Diamond_HistoryCreateOrConnectWithoutUserInput | Prisma.Game_Diamond_HistoryCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.Game_Diamond_HistoryUpsertWithWhereUniqueWithoutUserInput | Prisma.Game_Diamond_HistoryUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.Game_Diamond_HistoryCreateManyUserInputEnvelope;
    set?: Prisma.Game_Diamond_HistoryWhereUniqueInput | Prisma.Game_Diamond_HistoryWhereUniqueInput[];
    disconnect?: Prisma.Game_Diamond_HistoryWhereUniqueInput | Prisma.Game_Diamond_HistoryWhereUniqueInput[];
    delete?: Prisma.Game_Diamond_HistoryWhereUniqueInput | Prisma.Game_Diamond_HistoryWhereUniqueInput[];
    connect?: Prisma.Game_Diamond_HistoryWhereUniqueInput | Prisma.Game_Diamond_HistoryWhereUniqueInput[];
    update?: Prisma.Game_Diamond_HistoryUpdateWithWhereUniqueWithoutUserInput | Prisma.Game_Diamond_HistoryUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.Game_Diamond_HistoryUpdateManyWithWhereWithoutUserInput | Prisma.Game_Diamond_HistoryUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.Game_Diamond_HistoryScalarWhereInput | Prisma.Game_Diamond_HistoryScalarWhereInput[];
};
export type Game_Diamond_HistoryCreateminesInput = {
    set: number[];
};
export type Game_Diamond_HistoryCreateclickedTilesInput = {
    set: number[];
};
export type Game_Diamond_HistoryUpdateminesInput = {
    set?: number[];
    push?: number | number[];
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type Game_Diamond_HistoryUpdateclickedTilesInput = {
    set?: number[];
    push?: number | number[];
};
export type EnumGameStatusFieldUpdateOperationsInput = {
    set?: $Enums.GameStatus;
};
export type Game_Diamond_HistoryCreateWithoutUserInput = {
    id?: string;
    gameId: string;
    mines?: Prisma.Game_Diamond_HistoryCreateminesInput | number[];
    minesCount: number;
    stake: number;
    clickedTiles?: Prisma.Game_Diamond_HistoryCreateclickedTilesInput | number[];
    status: $Enums.GameStatus;
    balance: number;
    potentialWin: number;
    winAmount?: number;
    createdAt?: Date | string;
};
export type Game_Diamond_HistoryUncheckedCreateWithoutUserInput = {
    id?: string;
    gameId: string;
    mines?: Prisma.Game_Diamond_HistoryCreateminesInput | number[];
    minesCount: number;
    stake: number;
    clickedTiles?: Prisma.Game_Diamond_HistoryCreateclickedTilesInput | number[];
    status: $Enums.GameStatus;
    balance: number;
    potentialWin: number;
    winAmount?: number;
    createdAt?: Date | string;
};
export type Game_Diamond_HistoryCreateOrConnectWithoutUserInput = {
    where: Prisma.Game_Diamond_HistoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.Game_Diamond_HistoryCreateWithoutUserInput, Prisma.Game_Diamond_HistoryUncheckedCreateWithoutUserInput>;
};
export type Game_Diamond_HistoryCreateManyUserInputEnvelope = {
    data: Prisma.Game_Diamond_HistoryCreateManyUserInput | Prisma.Game_Diamond_HistoryCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type Game_Diamond_HistoryUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.Game_Diamond_HistoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.Game_Diamond_HistoryUpdateWithoutUserInput, Prisma.Game_Diamond_HistoryUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.Game_Diamond_HistoryCreateWithoutUserInput, Prisma.Game_Diamond_HistoryUncheckedCreateWithoutUserInput>;
};
export type Game_Diamond_HistoryUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.Game_Diamond_HistoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.Game_Diamond_HistoryUpdateWithoutUserInput, Prisma.Game_Diamond_HistoryUncheckedUpdateWithoutUserInput>;
};
export type Game_Diamond_HistoryUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.Game_Diamond_HistoryScalarWhereInput;
    data: Prisma.XOR<Prisma.Game_Diamond_HistoryUpdateManyMutationInput, Prisma.Game_Diamond_HistoryUncheckedUpdateManyWithoutUserInput>;
};
export type Game_Diamond_HistoryScalarWhereInput = {
    AND?: Prisma.Game_Diamond_HistoryScalarWhereInput | Prisma.Game_Diamond_HistoryScalarWhereInput[];
    OR?: Prisma.Game_Diamond_HistoryScalarWhereInput[];
    NOT?: Prisma.Game_Diamond_HistoryScalarWhereInput | Prisma.Game_Diamond_HistoryScalarWhereInput[];
    id?: Prisma.StringFilter<"Game_Diamond_History"> | string;
    userId?: Prisma.StringFilter<"Game_Diamond_History"> | string;
    gameId?: Prisma.StringFilter<"Game_Diamond_History"> | string;
    mines?: Prisma.IntNullableListFilter<"Game_Diamond_History">;
    minesCount?: Prisma.IntFilter<"Game_Diamond_History"> | number;
    stake?: Prisma.FloatFilter<"Game_Diamond_History"> | number;
    clickedTiles?: Prisma.IntNullableListFilter<"Game_Diamond_History">;
    status?: Prisma.EnumGameStatusFilter<"Game_Diamond_History"> | $Enums.GameStatus;
    balance?: Prisma.FloatFilter<"Game_Diamond_History"> | number;
    potentialWin?: Prisma.FloatFilter<"Game_Diamond_History"> | number;
    winAmount?: Prisma.FloatFilter<"Game_Diamond_History"> | number;
    createdAt?: Prisma.DateTimeFilter<"Game_Diamond_History"> | Date | string;
};
export type Game_Diamond_HistoryCreateManyUserInput = {
    id?: string;
    gameId: string;
    mines?: Prisma.Game_Diamond_HistoryCreateminesInput | number[];
    minesCount: number;
    stake: number;
    clickedTiles?: Prisma.Game_Diamond_HistoryCreateclickedTilesInput | number[];
    status: $Enums.GameStatus;
    balance: number;
    potentialWin: number;
    winAmount?: number;
    createdAt?: Date | string;
};
export type Game_Diamond_HistoryUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    gameId?: Prisma.StringFieldUpdateOperationsInput | string;
    mines?: Prisma.Game_Diamond_HistoryUpdateminesInput | number[];
    minesCount?: Prisma.IntFieldUpdateOperationsInput | number;
    stake?: Prisma.FloatFieldUpdateOperationsInput | number;
    clickedTiles?: Prisma.Game_Diamond_HistoryUpdateclickedTilesInput | number[];
    status?: Prisma.EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus;
    balance?: Prisma.FloatFieldUpdateOperationsInput | number;
    potentialWin?: Prisma.FloatFieldUpdateOperationsInput | number;
    winAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type Game_Diamond_HistoryUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    gameId?: Prisma.StringFieldUpdateOperationsInput | string;
    mines?: Prisma.Game_Diamond_HistoryUpdateminesInput | number[];
    minesCount?: Prisma.IntFieldUpdateOperationsInput | number;
    stake?: Prisma.FloatFieldUpdateOperationsInput | number;
    clickedTiles?: Prisma.Game_Diamond_HistoryUpdateclickedTilesInput | number[];
    status?: Prisma.EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus;
    balance?: Prisma.FloatFieldUpdateOperationsInput | number;
    potentialWin?: Prisma.FloatFieldUpdateOperationsInput | number;
    winAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type Game_Diamond_HistoryUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    gameId?: Prisma.StringFieldUpdateOperationsInput | string;
    mines?: Prisma.Game_Diamond_HistoryUpdateminesInput | number[];
    minesCount?: Prisma.IntFieldUpdateOperationsInput | number;
    stake?: Prisma.FloatFieldUpdateOperationsInput | number;
    clickedTiles?: Prisma.Game_Diamond_HistoryUpdateclickedTilesInput | number[];
    status?: Prisma.EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus;
    balance?: Prisma.FloatFieldUpdateOperationsInput | number;
    potentialWin?: Prisma.FloatFieldUpdateOperationsInput | number;
    winAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type Game_Diamond_HistorySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    gameId?: boolean;
    mines?: boolean;
    minesCount?: boolean;
    stake?: boolean;
    clickedTiles?: boolean;
    status?: boolean;
    balance?: boolean;
    potentialWin?: boolean;
    winAmount?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["game_Diamond_History"]>;
export type Game_Diamond_HistorySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    gameId?: boolean;
    mines?: boolean;
    minesCount?: boolean;
    stake?: boolean;
    clickedTiles?: boolean;
    status?: boolean;
    balance?: boolean;
    potentialWin?: boolean;
    winAmount?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["game_Diamond_History"]>;
export type Game_Diamond_HistorySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    gameId?: boolean;
    mines?: boolean;
    minesCount?: boolean;
    stake?: boolean;
    clickedTiles?: boolean;
    status?: boolean;
    balance?: boolean;
    potentialWin?: boolean;
    winAmount?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["game_Diamond_History"]>;
export type Game_Diamond_HistorySelectScalar = {
    id?: boolean;
    userId?: boolean;
    gameId?: boolean;
    mines?: boolean;
    minesCount?: boolean;
    stake?: boolean;
    clickedTiles?: boolean;
    status?: boolean;
    balance?: boolean;
    potentialWin?: boolean;
    winAmount?: boolean;
    createdAt?: boolean;
};
export type Game_Diamond_HistoryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "gameId" | "mines" | "minesCount" | "stake" | "clickedTiles" | "status" | "balance" | "potentialWin" | "winAmount" | "createdAt", ExtArgs["result"]["game_Diamond_History"]>;
export type Game_Diamond_HistoryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type Game_Diamond_HistoryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type Game_Diamond_HistoryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $Game_Diamond_HistoryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Game_Diamond_History";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        gameId: string;
        mines: number[];
        minesCount: number;
        stake: number;
        clickedTiles: number[];
        status: $Enums.GameStatus;
        balance: number;
        potentialWin: number;
        winAmount: number;
        createdAt: Date;
    }, ExtArgs["result"]["game_Diamond_History"]>;
    composites: {};
};
export type Game_Diamond_HistoryGetPayload<S extends boolean | null | undefined | Game_Diamond_HistoryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$Game_Diamond_HistoryPayload, S>;
export type Game_Diamond_HistoryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<Game_Diamond_HistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Game_Diamond_HistoryCountAggregateInputType | true;
};
export interface Game_Diamond_HistoryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Game_Diamond_History'];
        meta: {
            name: 'Game_Diamond_History';
        };
    };
    /**
     * Find zero or one Game_Diamond_History that matches the filter.
     * @param {Game_Diamond_HistoryFindUniqueArgs} args - Arguments to find a Game_Diamond_History
     * @example
     * // Get one Game_Diamond_History
     * const game_Diamond_History = await prisma.game_Diamond_History.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends Game_Diamond_HistoryFindUniqueArgs>(args: Prisma.SelectSubset<T, Game_Diamond_HistoryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__Game_Diamond_HistoryClient<runtime.Types.Result.GetResult<Prisma.$Game_Diamond_HistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Game_Diamond_History that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {Game_Diamond_HistoryFindUniqueOrThrowArgs} args - Arguments to find a Game_Diamond_History
     * @example
     * // Get one Game_Diamond_History
     * const game_Diamond_History = await prisma.game_Diamond_History.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends Game_Diamond_HistoryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, Game_Diamond_HistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__Game_Diamond_HistoryClient<runtime.Types.Result.GetResult<Prisma.$Game_Diamond_HistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Game_Diamond_History that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Game_Diamond_HistoryFindFirstArgs} args - Arguments to find a Game_Diamond_History
     * @example
     * // Get one Game_Diamond_History
     * const game_Diamond_History = await prisma.game_Diamond_History.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends Game_Diamond_HistoryFindFirstArgs>(args?: Prisma.SelectSubset<T, Game_Diamond_HistoryFindFirstArgs<ExtArgs>>): Prisma.Prisma__Game_Diamond_HistoryClient<runtime.Types.Result.GetResult<Prisma.$Game_Diamond_HistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Game_Diamond_History that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Game_Diamond_HistoryFindFirstOrThrowArgs} args - Arguments to find a Game_Diamond_History
     * @example
     * // Get one Game_Diamond_History
     * const game_Diamond_History = await prisma.game_Diamond_History.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends Game_Diamond_HistoryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, Game_Diamond_HistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__Game_Diamond_HistoryClient<runtime.Types.Result.GetResult<Prisma.$Game_Diamond_HistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Game_Diamond_Histories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Game_Diamond_HistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Game_Diamond_Histories
     * const game_Diamond_Histories = await prisma.game_Diamond_History.findMany()
     *
     * // Get first 10 Game_Diamond_Histories
     * const game_Diamond_Histories = await prisma.game_Diamond_History.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const game_Diamond_HistoryWithIdOnly = await prisma.game_Diamond_History.findMany({ select: { id: true } })
     *
     */
    findMany<T extends Game_Diamond_HistoryFindManyArgs>(args?: Prisma.SelectSubset<T, Game_Diamond_HistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$Game_Diamond_HistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Game_Diamond_History.
     * @param {Game_Diamond_HistoryCreateArgs} args - Arguments to create a Game_Diamond_History.
     * @example
     * // Create one Game_Diamond_History
     * const Game_Diamond_History = await prisma.game_Diamond_History.create({
     *   data: {
     *     // ... data to create a Game_Diamond_History
     *   }
     * })
     *
     */
    create<T extends Game_Diamond_HistoryCreateArgs>(args: Prisma.SelectSubset<T, Game_Diamond_HistoryCreateArgs<ExtArgs>>): Prisma.Prisma__Game_Diamond_HistoryClient<runtime.Types.Result.GetResult<Prisma.$Game_Diamond_HistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Game_Diamond_Histories.
     * @param {Game_Diamond_HistoryCreateManyArgs} args - Arguments to create many Game_Diamond_Histories.
     * @example
     * // Create many Game_Diamond_Histories
     * const game_Diamond_History = await prisma.game_Diamond_History.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends Game_Diamond_HistoryCreateManyArgs>(args?: Prisma.SelectSubset<T, Game_Diamond_HistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Game_Diamond_Histories and returns the data saved in the database.
     * @param {Game_Diamond_HistoryCreateManyAndReturnArgs} args - Arguments to create many Game_Diamond_Histories.
     * @example
     * // Create many Game_Diamond_Histories
     * const game_Diamond_History = await prisma.game_Diamond_History.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Game_Diamond_Histories and only return the `id`
     * const game_Diamond_HistoryWithIdOnly = await prisma.game_Diamond_History.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends Game_Diamond_HistoryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, Game_Diamond_HistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$Game_Diamond_HistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Game_Diamond_History.
     * @param {Game_Diamond_HistoryDeleteArgs} args - Arguments to delete one Game_Diamond_History.
     * @example
     * // Delete one Game_Diamond_History
     * const Game_Diamond_History = await prisma.game_Diamond_History.delete({
     *   where: {
     *     // ... filter to delete one Game_Diamond_History
     *   }
     * })
     *
     */
    delete<T extends Game_Diamond_HistoryDeleteArgs>(args: Prisma.SelectSubset<T, Game_Diamond_HistoryDeleteArgs<ExtArgs>>): Prisma.Prisma__Game_Diamond_HistoryClient<runtime.Types.Result.GetResult<Prisma.$Game_Diamond_HistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Game_Diamond_History.
     * @param {Game_Diamond_HistoryUpdateArgs} args - Arguments to update one Game_Diamond_History.
     * @example
     * // Update one Game_Diamond_History
     * const game_Diamond_History = await prisma.game_Diamond_History.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends Game_Diamond_HistoryUpdateArgs>(args: Prisma.SelectSubset<T, Game_Diamond_HistoryUpdateArgs<ExtArgs>>): Prisma.Prisma__Game_Diamond_HistoryClient<runtime.Types.Result.GetResult<Prisma.$Game_Diamond_HistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Game_Diamond_Histories.
     * @param {Game_Diamond_HistoryDeleteManyArgs} args - Arguments to filter Game_Diamond_Histories to delete.
     * @example
     * // Delete a few Game_Diamond_Histories
     * const { count } = await prisma.game_Diamond_History.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends Game_Diamond_HistoryDeleteManyArgs>(args?: Prisma.SelectSubset<T, Game_Diamond_HistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Game_Diamond_Histories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Game_Diamond_HistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Game_Diamond_Histories
     * const game_Diamond_History = await prisma.game_Diamond_History.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends Game_Diamond_HistoryUpdateManyArgs>(args: Prisma.SelectSubset<T, Game_Diamond_HistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Game_Diamond_Histories and returns the data updated in the database.
     * @param {Game_Diamond_HistoryUpdateManyAndReturnArgs} args - Arguments to update many Game_Diamond_Histories.
     * @example
     * // Update many Game_Diamond_Histories
     * const game_Diamond_History = await prisma.game_Diamond_History.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Game_Diamond_Histories and only return the `id`
     * const game_Diamond_HistoryWithIdOnly = await prisma.game_Diamond_History.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends Game_Diamond_HistoryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, Game_Diamond_HistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$Game_Diamond_HistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Game_Diamond_History.
     * @param {Game_Diamond_HistoryUpsertArgs} args - Arguments to update or create a Game_Diamond_History.
     * @example
     * // Update or create a Game_Diamond_History
     * const game_Diamond_History = await prisma.game_Diamond_History.upsert({
     *   create: {
     *     // ... data to create a Game_Diamond_History
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Game_Diamond_History we want to update
     *   }
     * })
     */
    upsert<T extends Game_Diamond_HistoryUpsertArgs>(args: Prisma.SelectSubset<T, Game_Diamond_HistoryUpsertArgs<ExtArgs>>): Prisma.Prisma__Game_Diamond_HistoryClient<runtime.Types.Result.GetResult<Prisma.$Game_Diamond_HistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Game_Diamond_Histories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Game_Diamond_HistoryCountArgs} args - Arguments to filter Game_Diamond_Histories to count.
     * @example
     * // Count the number of Game_Diamond_Histories
     * const count = await prisma.game_Diamond_History.count({
     *   where: {
     *     // ... the filter for the Game_Diamond_Histories we want to count
     *   }
     * })
    **/
    count<T extends Game_Diamond_HistoryCountArgs>(args?: Prisma.Subset<T, Game_Diamond_HistoryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Game_Diamond_HistoryCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Game_Diamond_History.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Game_Diamond_HistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Game_Diamond_HistoryAggregateArgs>(args: Prisma.Subset<T, Game_Diamond_HistoryAggregateArgs>): Prisma.PrismaPromise<GetGame_Diamond_HistoryAggregateType<T>>;
    /**
     * Group by Game_Diamond_History.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Game_Diamond_HistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends Game_Diamond_HistoryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: Game_Diamond_HistoryGroupByArgs['orderBy'];
    } : {
        orderBy?: Game_Diamond_HistoryGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, Game_Diamond_HistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGame_Diamond_HistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Game_Diamond_History model
     */
    readonly fields: Game_Diamond_HistoryFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Game_Diamond_History.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__Game_Diamond_HistoryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the Game_Diamond_History model
 */
export interface Game_Diamond_HistoryFieldRefs {
    readonly id: Prisma.FieldRef<"Game_Diamond_History", 'String'>;
    readonly userId: Prisma.FieldRef<"Game_Diamond_History", 'String'>;
    readonly gameId: Prisma.FieldRef<"Game_Diamond_History", 'String'>;
    readonly mines: Prisma.FieldRef<"Game_Diamond_History", 'Int[]'>;
    readonly minesCount: Prisma.FieldRef<"Game_Diamond_History", 'Int'>;
    readonly stake: Prisma.FieldRef<"Game_Diamond_History", 'Float'>;
    readonly clickedTiles: Prisma.FieldRef<"Game_Diamond_History", 'Int[]'>;
    readonly status: Prisma.FieldRef<"Game_Diamond_History", 'GameStatus'>;
    readonly balance: Prisma.FieldRef<"Game_Diamond_History", 'Float'>;
    readonly potentialWin: Prisma.FieldRef<"Game_Diamond_History", 'Float'>;
    readonly winAmount: Prisma.FieldRef<"Game_Diamond_History", 'Float'>;
    readonly createdAt: Prisma.FieldRef<"Game_Diamond_History", 'DateTime'>;
}
/**
 * Game_Diamond_History findUnique
 */
export type Game_Diamond_HistoryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game_Diamond_History
     */
    select?: Prisma.Game_Diamond_HistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Game_Diamond_History
     */
    omit?: Prisma.Game_Diamond_HistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.Game_Diamond_HistoryInclude<ExtArgs> | null;
    /**
     * Filter, which Game_Diamond_History to fetch.
     */
    where: Prisma.Game_Diamond_HistoryWhereUniqueInput;
};
/**
 * Game_Diamond_History findUniqueOrThrow
 */
export type Game_Diamond_HistoryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game_Diamond_History
     */
    select?: Prisma.Game_Diamond_HistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Game_Diamond_History
     */
    omit?: Prisma.Game_Diamond_HistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.Game_Diamond_HistoryInclude<ExtArgs> | null;
    /**
     * Filter, which Game_Diamond_History to fetch.
     */
    where: Prisma.Game_Diamond_HistoryWhereUniqueInput;
};
/**
 * Game_Diamond_History findFirst
 */
export type Game_Diamond_HistoryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game_Diamond_History
     */
    select?: Prisma.Game_Diamond_HistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Game_Diamond_History
     */
    omit?: Prisma.Game_Diamond_HistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.Game_Diamond_HistoryInclude<ExtArgs> | null;
    /**
     * Filter, which Game_Diamond_History to fetch.
     */
    where?: Prisma.Game_Diamond_HistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Game_Diamond_Histories to fetch.
     */
    orderBy?: Prisma.Game_Diamond_HistoryOrderByWithRelationInput | Prisma.Game_Diamond_HistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Game_Diamond_Histories.
     */
    cursor?: Prisma.Game_Diamond_HistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Game_Diamond_Histories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Game_Diamond_Histories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Game_Diamond_Histories.
     */
    distinct?: Prisma.Game_Diamond_HistoryScalarFieldEnum | Prisma.Game_Diamond_HistoryScalarFieldEnum[];
};
/**
 * Game_Diamond_History findFirstOrThrow
 */
export type Game_Diamond_HistoryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game_Diamond_History
     */
    select?: Prisma.Game_Diamond_HistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Game_Diamond_History
     */
    omit?: Prisma.Game_Diamond_HistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.Game_Diamond_HistoryInclude<ExtArgs> | null;
    /**
     * Filter, which Game_Diamond_History to fetch.
     */
    where?: Prisma.Game_Diamond_HistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Game_Diamond_Histories to fetch.
     */
    orderBy?: Prisma.Game_Diamond_HistoryOrderByWithRelationInput | Prisma.Game_Diamond_HistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Game_Diamond_Histories.
     */
    cursor?: Prisma.Game_Diamond_HistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Game_Diamond_Histories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Game_Diamond_Histories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Game_Diamond_Histories.
     */
    distinct?: Prisma.Game_Diamond_HistoryScalarFieldEnum | Prisma.Game_Diamond_HistoryScalarFieldEnum[];
};
/**
 * Game_Diamond_History findMany
 */
export type Game_Diamond_HistoryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game_Diamond_History
     */
    select?: Prisma.Game_Diamond_HistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Game_Diamond_History
     */
    omit?: Prisma.Game_Diamond_HistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.Game_Diamond_HistoryInclude<ExtArgs> | null;
    /**
     * Filter, which Game_Diamond_Histories to fetch.
     */
    where?: Prisma.Game_Diamond_HistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Game_Diamond_Histories to fetch.
     */
    orderBy?: Prisma.Game_Diamond_HistoryOrderByWithRelationInput | Prisma.Game_Diamond_HistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Game_Diamond_Histories.
     */
    cursor?: Prisma.Game_Diamond_HistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Game_Diamond_Histories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Game_Diamond_Histories.
     */
    skip?: number;
    distinct?: Prisma.Game_Diamond_HistoryScalarFieldEnum | Prisma.Game_Diamond_HistoryScalarFieldEnum[];
};
/**
 * Game_Diamond_History create
 */
export type Game_Diamond_HistoryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game_Diamond_History
     */
    select?: Prisma.Game_Diamond_HistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Game_Diamond_History
     */
    omit?: Prisma.Game_Diamond_HistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.Game_Diamond_HistoryInclude<ExtArgs> | null;
    /**
     * The data needed to create a Game_Diamond_History.
     */
    data: Prisma.XOR<Prisma.Game_Diamond_HistoryCreateInput, Prisma.Game_Diamond_HistoryUncheckedCreateInput>;
};
/**
 * Game_Diamond_History createMany
 */
export type Game_Diamond_HistoryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Game_Diamond_Histories.
     */
    data: Prisma.Game_Diamond_HistoryCreateManyInput | Prisma.Game_Diamond_HistoryCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Game_Diamond_History createManyAndReturn
 */
export type Game_Diamond_HistoryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game_Diamond_History
     */
    select?: Prisma.Game_Diamond_HistorySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Game_Diamond_History
     */
    omit?: Prisma.Game_Diamond_HistoryOmit<ExtArgs> | null;
    /**
     * The data used to create many Game_Diamond_Histories.
     */
    data: Prisma.Game_Diamond_HistoryCreateManyInput | Prisma.Game_Diamond_HistoryCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.Game_Diamond_HistoryIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Game_Diamond_History update
 */
export type Game_Diamond_HistoryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game_Diamond_History
     */
    select?: Prisma.Game_Diamond_HistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Game_Diamond_History
     */
    omit?: Prisma.Game_Diamond_HistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.Game_Diamond_HistoryInclude<ExtArgs> | null;
    /**
     * The data needed to update a Game_Diamond_History.
     */
    data: Prisma.XOR<Prisma.Game_Diamond_HistoryUpdateInput, Prisma.Game_Diamond_HistoryUncheckedUpdateInput>;
    /**
     * Choose, which Game_Diamond_History to update.
     */
    where: Prisma.Game_Diamond_HistoryWhereUniqueInput;
};
/**
 * Game_Diamond_History updateMany
 */
export type Game_Diamond_HistoryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Game_Diamond_Histories.
     */
    data: Prisma.XOR<Prisma.Game_Diamond_HistoryUpdateManyMutationInput, Prisma.Game_Diamond_HistoryUncheckedUpdateManyInput>;
    /**
     * Filter which Game_Diamond_Histories to update
     */
    where?: Prisma.Game_Diamond_HistoryWhereInput;
    /**
     * Limit how many Game_Diamond_Histories to update.
     */
    limit?: number;
};
/**
 * Game_Diamond_History updateManyAndReturn
 */
export type Game_Diamond_HistoryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game_Diamond_History
     */
    select?: Prisma.Game_Diamond_HistorySelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Game_Diamond_History
     */
    omit?: Prisma.Game_Diamond_HistoryOmit<ExtArgs> | null;
    /**
     * The data used to update Game_Diamond_Histories.
     */
    data: Prisma.XOR<Prisma.Game_Diamond_HistoryUpdateManyMutationInput, Prisma.Game_Diamond_HistoryUncheckedUpdateManyInput>;
    /**
     * Filter which Game_Diamond_Histories to update
     */
    where?: Prisma.Game_Diamond_HistoryWhereInput;
    /**
     * Limit how many Game_Diamond_Histories to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.Game_Diamond_HistoryIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Game_Diamond_History upsert
 */
export type Game_Diamond_HistoryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game_Diamond_History
     */
    select?: Prisma.Game_Diamond_HistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Game_Diamond_History
     */
    omit?: Prisma.Game_Diamond_HistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.Game_Diamond_HistoryInclude<ExtArgs> | null;
    /**
     * The filter to search for the Game_Diamond_History to update in case it exists.
     */
    where: Prisma.Game_Diamond_HistoryWhereUniqueInput;
    /**
     * In case the Game_Diamond_History found by the `where` argument doesn't exist, create a new Game_Diamond_History with this data.
     */
    create: Prisma.XOR<Prisma.Game_Diamond_HistoryCreateInput, Prisma.Game_Diamond_HistoryUncheckedCreateInput>;
    /**
     * In case the Game_Diamond_History was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.Game_Diamond_HistoryUpdateInput, Prisma.Game_Diamond_HistoryUncheckedUpdateInput>;
};
/**
 * Game_Diamond_History delete
 */
export type Game_Diamond_HistoryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game_Diamond_History
     */
    select?: Prisma.Game_Diamond_HistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Game_Diamond_History
     */
    omit?: Prisma.Game_Diamond_HistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.Game_Diamond_HistoryInclude<ExtArgs> | null;
    /**
     * Filter which Game_Diamond_History to delete.
     */
    where: Prisma.Game_Diamond_HistoryWhereUniqueInput;
};
/**
 * Game_Diamond_History deleteMany
 */
export type Game_Diamond_HistoryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Game_Diamond_Histories to delete
     */
    where?: Prisma.Game_Diamond_HistoryWhereInput;
    /**
     * Limit how many Game_Diamond_Histories to delete.
     */
    limit?: number;
};
/**
 * Game_Diamond_History without action
 */
export type Game_Diamond_HistoryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game_Diamond_History
     */
    select?: Prisma.Game_Diamond_HistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Game_Diamond_History
     */
    omit?: Prisma.Game_Diamond_HistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.Game_Diamond_HistoryInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Game_Diamond_History.d.ts.map