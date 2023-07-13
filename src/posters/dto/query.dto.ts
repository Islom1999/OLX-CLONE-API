import { ApiProperty } from "@nestjs/swagger";

export class QueryDto{
    @ApiProperty({
        type: String,
        description: "Posters Category",
        required: false
    })
    category: string

    @ApiProperty({
        type: String,
        description: "Posters Search Title",
        required: false
    })
    search: string

    @ApiProperty({
        type: Number,
        description: "Posters from amount",
        required: false
    })
    from: number

    @ApiProperty({
        type: Number,
        description: "Posters to amount",
        required: false
    })
    to: number

    @ApiProperty({
        type: Number,
        description: "Posters Page Pagination",
        required: false
    })
    page: number
    
    @ApiProperty({
        type: Number,
        description: "Posters Limit Pagination",
        required: false
    })
    limit: number
}