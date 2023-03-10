import {
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
  ValidationPipe
} from "@nestjs/common"
import { ResponseInterceptor } from "src/common/response.interceptor"
import { delay } from "src/common/utils"

import { AuthenticatedGuard } from "../auth/authenticated.guard"
import { GetQuoteDTO } from "./quote.dto"
import { QuoteService } from "./quote.service"

@UseInterceptors(ResponseInterceptor)
@Controller({
  version: "1",
  path: "quote"
})
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  /* eslint-disable indent */
  async getQuote(
    @Query(new ValidationPipe())
    data: GetQuoteDTO
  ): Promise<{
    authorId: number
    quoteId: number
    quote: string
  }> {
    const quote = await this.quoteService.getQuoteByAuthorId(
      Number(data.authorId)
    )

    await delay(5000)

    return {
      authorId: quote.author_id,
      quoteId: quote.id,
      quote: quote.quote
    }
  }
}
