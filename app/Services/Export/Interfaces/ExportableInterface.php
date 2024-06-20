<?php

namespace App\Services\Export\Interfaces;

interface ExportableInterface
{

    public function export();

    public function routes(array $routes);

    public function text(): string;

    public function download();

    public function isDownloadable(): bool;

}
